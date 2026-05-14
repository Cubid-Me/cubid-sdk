import assert from "node:assert/strict"
import { test } from "vitest"

import {
  createCubidAppScopedSubject,
  createCubidApiClient,
  CubidApiError,
  CubidSiwcError,
  getCubidStampTypeId,
  getCubidStampTypeName,
  getCubidStampTypeNamesById,
  isCubidSignedTransactionResult,
  isCubidSigningSignatureResult,
  type CubidFetch,
  isCubidSiwcError,
  parseCubidWebhookEvent,
  summarizeCubidDisclosedStamp,
  verifyCubidWebhookSignature,
} from "./index"

const createJsonResponse = (payload: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json",
      "x-request-id": "request_123",
      ...(init.headers ?? {}),
    },
    status: init.status ?? 200,
  })

const signWebhookPayload = async (
  secret: string,
  eventId: string,
  timestamp: string,
  payload: string | Uint8Array
) => {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"]
  )
  const payloadBytes =
    typeof payload === "string" ? new TextEncoder().encode(payload) : payload
  const prefixBytes = new TextEncoder().encode(`${eventId}.${timestamp}.`)
  const signatureInput = new Uint8Array(prefixBytes.length + payloadBytes.length)
  signatureInput.set(prefixBytes, 0)
  signatureInput.set(payloadBytes, prefixBytes.length)
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    signatureInput
  )

  return Array.from(new Uint8Array(signature), (value) =>
    value.toString(16).padStart(2, "0")
  ).join("")
}

test("createCubidApiClient rejects invalid configuration safely", () => {
  assert.throws(
    () => createCubidApiClient({ apiKey: "key", baseUrl: "" }),
    (error) =>
      error instanceof CubidApiError &&
      error.category === "config" &&
      !error.message.includes("key")
  )

  assert.throws(
    () => createCubidApiClient({ apiKey: "   ", baseUrl: "https://api.test" }),
    (error) =>
      error instanceof CubidApiError &&
      error.category === "config" &&
      !error.message.includes("api_")
  )

  assert.throws(
    () =>
      createCubidApiClient({
        apiKey: "key",
        baseUrl: "file://localhost/tmp/cubid",
      }),
    (error) =>
      error instanceof CubidApiError &&
      error.category === "config" &&
      error.message.includes("HTTPS")
  )
})

test("createCubidApiClient allows HTTP only for loopback development hosts", async () => {
  const inputs: Array<string | URL> = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    new URL("http://[::1]:3000"),
  ]

  for (const baseUrl of inputs) {
    const client = createCubidApiClient({
      apiKey: "api_key",
      baseUrl,
      fetch: async () => createJsonResponse({ cubid_score: 1 }),
    })

    const response = await client.fetchScore({ userId: "dapp_user_123" })
    assert.equal(response.cubidScore, 1)
  }

  assert.throws(
    () =>
      createCubidApiClient({
        apiKey: "api_key",
        baseUrl: "http://example.com",
      }),
    (error) =>
      error instanceof CubidApiError &&
      error.category === "config" &&
      error.message.includes("loopback")
  )
})

test("createUser posts legacy v2 payload with credentials", async () => {
  const calls: Array<{ body: unknown; input: string | URL | Request }> = []
  const fetchImpl: CubidFetch = async (input, init) => {
    calls.push({
      body: JSON.parse(String(init?.body)),
      input,
    })
    return createJsonResponse({
      error: null,
      is_blacklisted: false,
      is_new_app_user: true,
      is_sybil_attack: false,
      user_id: "dapp_user_123",
    })
  }

  const client = createCubidApiClient({
    apiKey: "cubid_live_lookup_secret",
    baseUrl: "https://passport.cubid.me/",
    dappId: 42,
    fetch: fetchImpl,
  })
  const response = await client.createUser({ email: "user@example.com" })

  assert.equal(response.userId, "dapp_user_123")
  assert.equal(response.isNewAppUser, true)
  assert.equal(response.isSybilAttack, false)
  assert.equal(response.isBlacklisted, false)
  assert.equal(
    String(calls[0]?.input),
    "https://passport.cubid.me/api/v2/create_user"
  )
  assert.deepEqual(calls[0]?.body, {
    apikey: "cubid_live_lookup_secret",
    dapp_id: 42,
    email: "user@example.com",
  })
})

test("low-level wrappers use injected fetch for identity, score, and stamps", async () => {
  const paths: string[] = []
  const fetchImpl: CubidFetch = async (input) => {
    const path = new URL(String(input)).pathname
    paths.push(path)
    if (path.endsWith("/fetch_identity")) {
      return createJsonResponse({
        error: null,
        stamp_details: [
          {
            stamp_type: "email",
            status: "Verified",
            value: "user@example.com",
          },
        ],
      })
    }
    if (path.endsWith("/fetch_score")) {
      return createJsonResponse({
        cubid_score: 10,
        error: null,
        scoring_schema: 1,
      })
    }
    return createJsonResponse({ all_stamps: [], email: "user@example.com" })
  }

  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: fetchImpl,
  })

  const identity = await client.fetchIdentity({ userId: "dapp_user_123" })
  const score = await client.fetchScore({ userId: "dapp_user_123" })
  const stamps = await client.fetchStamps({ userId: "dapp_user_123" })

  assert.deepEqual(identity.stampDetails, [
    {
      raw: {
        stamp_type: "email",
        status: "Verified",
        value: "user@example.com",
      },
      stampType: "email",
      status: "Verified",
      value: "user@example.com",
    },
  ])
  assert.equal(score.cubidScore, 10)
  assert.equal(score.scoringSchema, 1)
  assert.deepEqual(stamps.allStamps, [])
  assert.equal(stamps.email, "user@example.com")

  assert.deepEqual(paths, [
    "/api/v2/identity/fetch_identity",
    "/api/v2/score/fetch_score",
    "/api/v2/identity/fetch_stamps",
  ])
})

test("HTTP failures map to structured CubidApiError values", async () => {
  const fetchImpl: CubidFetch = async () =>
    createJsonResponse(
      {
        error: {
          code: "rate_limit_exceeded",
          message: "Too many requests.",
        },
      },
      { status: 429 }
    )
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: fetchImpl,
  })

  await assert.rejects(
    () => client.fetchScore({ userId: "dapp_user_123" }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.category, "rate_limit")
      assert.equal(error.status, 429)
      assert.equal(error.requestId, "request_123")
      assert.equal(error.message, "Too many requests.")
      return true
    }
  )
})

test("transport failures map to structured CubidApiError values", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () => {
      throw new TypeError("network unavailable")
    },
  })

  await assert.rejects(
    () => client.fetchScore({ userId: "dapp_user_123" }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.category, "upstream")
      assert.equal(error.status, undefined)
      assert.equal(error.requestId, undefined)
      assert.equal(
        error.message,
        "Cubid API request failed before receiving a response."
      )
      assert.ok(error.details instanceof TypeError)
      return true
    }
  )
})

test("createUser requires a dapp id without leaking the API key", async () => {
  const client = createCubidApiClient({
    apiKey: "very-secret-api-key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () => createJsonResponse({}),
  })

  assert.throws(
    () => client.createUser({ email: "user@example.com" }),
    (error) =>
      error instanceof CubidApiError &&
      error.category === "config" &&
      !error.message.includes("very-secret-api-key")
  )
})

test("ensureUserByEmail resolves the canonical user id through create_user", async () => {
  const calls: Array<{ body: unknown; input: string | URL | Request }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    dappId: "dapp_123",
    fetch: async (input, init) => {
      calls.push({
        body: JSON.parse(String(init?.body)),
        input,
      })
      return createJsonResponse({
        error: null,
        is_blacklisted: false,
        is_new_app_user: false,
        is_sybil_attack: false,
        user_id: "dapp_user_123",
      })
    },
  })

  const { ensureUserByEmail } = client
  const response = await ensureUserByEmail({
    email: " user@example.com ",
  })

  assert.equal(response.email, "user@example.com")
  assert.equal(response.userId, "dapp_user_123")
  assert.equal(response.isNewAppUser, false)
  assert.deepEqual(calls[0]?.body, {
    apikey: "api_key",
    dapp_id: "dapp_123",
    email: "user@example.com",
  })
})

test("malformed success responses map to structured CubidApiError values", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () => createJsonResponse(["not", "an", "object"]),
  })

  await assert.rejects(
    () => client.fetchIdentity({ userId: "dapp_user_123" }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.category, "upstream")
      assert.equal(error.code, "MALFORMED_RESPONSE")
      assert.equal(error.endpoint, "identity/fetch_identity")
      assert.equal(error.requestId, "request_123")
      return true
    }
  )
})

test("syncIdentitySnapshot combines identity, score, and stamp responses", async () => {
  const paths: string[] = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input) => {
      const path = new URL(String(input)).pathname
      paths.push(path)

      if (path.endsWith("/fetch_identity")) {
        return createJsonResponse({ error: null, stamp_details: [] })
      }
      if (path.endsWith("/fetch_score")) {
        return createJsonResponse({
          cubid_score: 99,
          error: null,
          scoring_schema: "v2",
        })
      }
      return createJsonResponse({
        all_stamps: [
          {
            id: 1,
            is_valid: true,
            stamptype: 13,
            stamptype_string: "email",
            uniquevalue: "user@example.com",
          },
        ],
        email: "user@example.com",
      })
    },
  })

  const { syncIdentitySnapshot } = client
  const snapshot = await syncIdentitySnapshot({
    userId: "dapp_user_123",
  })

  assert.equal(snapshot.userId, "dapp_user_123")
  assert.equal(snapshot.score.cubidScore, 99)
  assert.equal(snapshot.stamps.allStamps[0]?.stampType, "email")
  assert.match(snapshot.syncedAt, /^\d{4}-\d{2}-\d{2}T/)
  assert.deepEqual(paths.sort(), [
    "/api/v2/identity/fetch_identity",
    "/api/v2/identity/fetch_stamps",
    "/api/v2/score/fetch_score",
  ])
})

test("additional runtime-agnostic wrappers normalize legacy v2 responses", async () => {
  const calls: Array<{ body: unknown; path: string }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input, init) => {
      const path = new URL(String(input)).pathname
      calls.push({
        body: JSON.parse(String(init?.body)),
        path,
      })

      if (path.endsWith("/identity/add_stamp")) {
        return createJsonResponse({ success: true })
      }
      if (path.endsWith("/fetch_approx_location")) {
        return createJsonResponse({
          coordinates: { lat: 43.65, lng: -79.38 },
          country: "Canada",
          error: null,
          placename: "Toronto",
          pluscode: "87M2",
          postalcode: "M5H",
        })
      }
      if (path.endsWith("/fetch_exact_location")) {
        return createJsonResponse({
          coordinates: { lat: 43.6501, lng: -79.3802 },
          country: "Canada",
          error: null,
          place: { city: "Toronto" },
        })
      }
      if (path.endsWith("/fetch_rough_location")) {
        return createJsonResponse({
          coordinates: { lat: 43.6, lng: -79.4 },
          cubid_country: "Canada",
          error: null,
          pluscode: "87M2",
        })
      }
      if (path.endsWith("/fetch_user_data")) {
        return createJsonResponse({
          coordinates: { lat: 43.65, lng: -79.38 },
          country: "Canada",
          error: null,
          name: "Cubid User",
          placename: "Toronto",
        })
      }
      if (path.endsWith("/search-location")) {
        return createJsonResponse([{ name: "Toronto" }, "fallback"])
      }

      throw new Error(`Unexpected path ${path}`)
    },
  })

  await assert.doesNotReject(() =>
    client.addStamp({
      pageId: "7",
      stampData: { identity: "user@example.com" },
      stampType: "email",
      userId: "dapp_user_123",
    })
  )
  const approx = await client.fetchApproxLocation({ userId: "dapp_user_123" })
  const exact = await client.fetchExactLocation({ userId: "dapp_user_123" })
  const rough = await client.fetchRoughLocation({ userId: "dapp_user_123" })
  const userData = await client.fetchUserData({ userId: "dapp_user_123" })
  const results = await client.searchLocation({ locationInput: "Toronto" })

  assert.equal(approx.placeName, "Toronto")
  assert.equal(approx.disclosure.state, "available")
  assert.equal(approx.granularity, "approximate")
  assert.equal(approx.postalCode, "M5H")
  assert.deepEqual(exact.place, { city: "Toronto" })
  assert.equal(exact.disclosure.state, "available")
  assert.equal(exact.granularity, "exact")
  assert.equal(rough.country, "Canada")
  assert.equal(rough.disclosure.state, "available")
  assert.equal(rough.granularity, "rough")
  assert.equal(userData.name, "Cubid User")
  assert.equal(userData.profileNameDisclosure.state, "available")
  assert.equal(userData.locationDisclosure.state, "available")
  assert.deepEqual(results, [{ name: "Toronto" }, { value: "fallback" }])
  assert.deepEqual(calls.map((call) => call.path), [
    "/api/v2/identity/add_stamp",
    "/api/v2/identity/fetch_approx_location",
    "/api/v2/identity/fetch_exact_location",
    "/api/v2/identity/fetch_rough_location",
    "/api/v2/identity/fetch_user_data",
    "/api/v2/search-location",
  ])
  assert.deepEqual(calls[0]?.body, {
    page_id: 7,
    stampData: { identity: "user@example.com" },
    stamp_type: "email",
    user_data: { uuid: "dapp_user_123" },
  })
})

test("location and profile helpers mark disclosure-limited null responses as notGranted", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input) => {
      const path = new URL(String(input)).pathname

      if (path.endsWith("/fetch_approx_location")) {
        return createJsonResponse({ error: null })
      }
      if (path.endsWith("/fetch_exact_location")) {
        return createJsonResponse({ error: null })
      }
      if (path.endsWith("/fetch_rough_location")) {
        return createJsonResponse({ error: null })
      }
      if (path.endsWith("/fetch_user_data")) {
        return createJsonResponse({
          country: null,
          error: null,
          name: null,
          placename: null,
        })
      }

      throw new Error(`Unexpected path ${path}`)
    },
  })

  const approx = await client.fetchApproxLocation({ userId: "dapp_user_123" })
  const exact = await client.fetchExactLocation({ userId: "dapp_user_123" })
  const rough = await client.fetchRoughLocation({ userId: "dapp_user_123" })
  const userData = await client.fetchUserData({ userId: "dapp_user_123" })

  assert.equal(approx.disclosure.state, "notGranted")
  assert.equal(exact.disclosure.state, "notGranted")
  assert.equal(rough.disclosure.state, "notGranted")
  assert.equal(userData.profileNameDisclosure.state, "notGranted")
  assert.equal(userData.locationDisclosure.state, "notGranted")
})

test("exact location treats null place values as disclosure-limited when no other data is present", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input) => {
      const path = new URL(String(input)).pathname

      if (path.endsWith("/fetch_exact_location")) {
        return createJsonResponse({
          country: null,
          error: null,
          place: null,
        })
      }

      throw new Error(`Unexpected path ${path}`)
    },
  })

  const exact = await client.fetchExactLocation({ userId: "dapp_user_123" })

  assert.equal(exact.place, null)
  assert.equal(exact.disclosure.state, "notGranted")
})

test("OTP wrappers normalize safe response metadata without returning OTP codes", async () => {
  const paths: string[] = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input) => {
      const path = new URL(String(input)).pathname
      paths.push(path)

      if (path.endsWith("/email/send_otp")) {
        return createJsonResponse({
          data: {
            dappId: 42,
            email: "user@example.com",
            otp: 1234,
            sent: true,
          },
        })
      }
      if (path.endsWith("/email/verify_otp")) {
        return createJsonResponse({
          data: {
            dappId: 42,
            email: "user@example.com",
            is_verified: true,
          },
        })
      }
      if (path.endsWith("/twillio/send-otp")) {
        return createJsonResponse({ data: { status: "sent" } })
      }
      if (path.endsWith("/twillio/verify-otp")) {
        return createJsonResponse({ data: { status: "approved" } })
      }

      throw new Error(`Unexpected path ${path}`)
    },
  })

  const emailSent = await client.sendEmailOtp({ email: "user@example.com" })
  const emailVerified = await client.verifyEmailOtp({
    email: "user@example.com",
    otp: 1234,
  })
  const phoneSent = await client.sendPhoneOtp({ phone: "+15555550123" })
  const phoneVerified = await client.verifyPhoneOtp({
    otp: "654321",
    phone: "+15555550123",
  })

  assert.equal(emailSent.sent, true)
  assert.equal("otp" in emailSent, false)
  assert.equal(emailVerified.isVerified, true)
  assert.equal(phoneSent.status, "sent")
  assert.equal(phoneVerified.isVerified, true)
  assert.deepEqual(paths, [
    "/api/v2/email/send_otp",
    "/api/v2/email/verify_otp",
    "/api/v2/twillio/send-otp",
    "/api/v2/twillio/verify-otp",
  ])
})

test("searchLocation rejects malformed successful payloads", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () => createJsonResponse({ results: [] }),
  })

  await assert.rejects(
    () => client.searchLocation({ locationInput: "Toronto" }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "MALFORMED_RESPONSE")
      assert.equal(error.endpoint, "search-location")
      return true
    }
  )
})

test("v3 saveSecret sends api_key credentials with an idempotency header", async () => {
  const calls: Array<{
    body: unknown
    headers: Headers
    input: string | URL | Request
  }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    dappId: "dapp_123",
    fetch: async (input, init) => {
      calls.push({
        body: JSON.parse(String(init?.body)),
        headers: new Headers(init?.headers),
        input,
      })
      return createJsonResponse({ success: true })
    },
  })

  const response = await client.saveSecret({
    idempotencyKey: "idempotency_123",
    secret: "super-secret",
    userId: "dapp_user_123",
  })

  assert.equal(response.success, true)
  assert.equal(response.idempotencyKey, "idempotency_123")
  assert.equal(
    String(calls[0]?.input),
    "https://passport.cubid.me/api/v3/save_secret"
  )
  assert.equal(calls[0]?.headers.get("Idempotency-Key"), "idempotency_123")
  assert.deepEqual(calls[0]?.body, {
    api_key: "api_key",
    dapp_id: "dapp_123",
    secret: "super-secret",
    user_id: "dapp_user_123",
  })
})

test("v3 custody helpers normalize generated and listed accounts, including sui", async () => {
  const calls: Array<{
    body: unknown
    headers: Headers
    path: string
  }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input, init) => {
      const path = new URL(String(input)).pathname
      calls.push({
        body: JSON.parse(String(init?.body)),
        headers: new Headers(init?.headers),
        path,
      })

      if (path.endsWith("/accounts/generate")) {
        return createJsonResponse({
          data: {
            accountId: "account_123",
            chain: "sui",
            createdAt: "2026-05-03T22:00:00.000Z",
            custodyStatus: "custodied",
            dappUserAccountId: "dua_123",
            dappUserUuid: "dapp_user_123",
            label: "Primary wallet",
            publicAddress: "0XABCDEF1234",
          },
        })
      }

      return createJsonResponse({
        data: [
          {
            accountId: "account_123",
            chain: "sui",
            createdAt: "2026-05-03T22:00:00.000Z",
            custodyStatus: "custodied",
            dappUserAccountId: "dua_123",
            dappUserUuid: "dapp_user_123",
            label: "Primary wallet",
            linkStatus: "linked",
            publicAddress: "0xabcdef1234",
            updatedAt: "2026-05-03T22:05:00.000Z",
          },
        ],
      })
    },
  })

  const generated = await client.generateAccount({
    chain: "sui",
    idempotencyKey: "generate_key_123",
    label: "Primary wallet",
    userId: "dapp_user_123",
  })
  const listed = await client.listAccounts({
    chain: "sui",
    userId: "dapp_user_123",
  })

  assert.equal(generated.idempotencyKey, "generate_key_123")
  assert.equal(generated.account.chain, "sui")
  assert.equal(generated.account.publicAddress, "0xabcdef1234")
  assert.equal(generated.account.userId, "dapp_user_123")
  assert.equal(calls[0]?.headers.get("Idempotency-Key"), "generate_key_123")
  assert.deepEqual(calls[0]?.body, {
    api_key: "api_key",
    chain: "sui",
    dapp_user_uuid: "dapp_user_123",
    label: "Primary wallet",
  })
  assert.equal(listed.accounts[0]?.linkStatus, "linked")
  assert.equal(listed.accounts[0]?.updatedAt, "2026-05-03T22:05:00.000Z")
  assert.equal(listed.accounts[0]?.publicAddress, "0xabcdef1234")
  assert.deepEqual(calls.map((call) => call.path), [
    "/api/v3/accounts/generate",
    "/api/v3/accounts/list",
  ])
})

test("v3 wallet capability and account-request helpers normalize passkey-approved custody flows", async () => {
  const calls: Array<{
    body: unknown
    headers: Headers
    path: string
  }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    dappId: "dapp_123",
    fetch: async (input, init) => {
      const path = new URL(String(input)).pathname
      calls.push({
        body: JSON.parse(String(init?.body)),
        headers: new Headers(init?.headers),
        path,
      })

      if (path.endsWith("/accounts/capabilities")) {
        return createJsonResponse({
          data: {
            accountCreationModes: {
              directGenerateEnabled: true,
              passkeyApprovedRequestEnabled: true,
            },
            accounts: [
              {
                accountId: "account_123",
                chain: "solana",
                createdAt: "2026-05-14T05:00:00.000Z",
                custodyStatus: "cubid_custodied",
                dappUserAccountId: "dua_123",
                dappUserUuid: "dapp_user_123",
                label: "Treasury wallet",
                linkStatus: "active",
                publicAddress: "So1ana111",
                updatedAt: "2026-05-14T05:01:00.000Z",
              },
            ],
            dappId: "dapp_123",
            dappUserUuid: "dapp_user_123",
            policy: {
              allowedChains: ["evm", "solana"],
              allowedRequestTypes: ["message", "transaction"],
              custodyEnabled: true,
              policyStatus: "enabled",
              policyVersion: 4,
              requiredAcr: "urn:cubid:acr:passkey",
              sandboxMode: true,
              signingEnabled: true,
            },
            supportedChains: ["evm", "near", "solana", "sui"],
            walletActionsByChain: {
              evm: {
                accountLookup: true,
                directGeneration: true,
                messageSigning: true,
                passkeyApprovedCreation: true,
                transactionSigning: true,
                transactionSigningStatus: "evm_pilot_policy_enabled",
                typedDataSigning: false,
              },
              solana: {
                accountLookup: true,
                directGeneration: false,
                messageSigning: true,
                passkeyApprovedCreation: true,
                transactionSigning: false,
                typedDataSigning: false,
              },
            },
          },
        })
      }

      if (path.endsWith("/accounts/requests/create")) {
        return createJsonResponse({
          data: {
            accountId: null,
            accountRequestId: "siwc_acct_req_123",
            chain: "solana",
            createdAt: "2026-05-14T05:10:00.000Z",
            dappId: "dapp_123",
            dappUserUuid: "dapp_user_123",
            expiresAt: "2026-05-14T05:20:00.000Z",
            label: "Treasury wallet",
            policyVersion: 4,
            requiredAcr: "urn:cubid:acr:passkey",
            status: "pending_user_approval",
            updatedAt: "2026-05-14T05:10:00.000Z",
          },
        })
      }

      return createJsonResponse({
        data: {
          accountId: "account_123",
          accountRequestId: "siwc_acct_req_123",
          approvedAt: "2026-05-14T05:12:00.000Z",
          chain: "solana",
          createdAt: "2026-05-14T05:10:00.000Z",
          dappId: "dapp_123",
          dappUserAccountId: "dua_123",
          dappUserUuid: "dapp_user_123",
          expiresAt: "2026-05-14T05:20:00.000Z",
          label: "Treasury wallet",
          policyVersion: 4,
          publicAddress: "So1ana111",
          requiredAcr: "urn:cubid:acr:passkey",
          status: "approved",
          updatedAt: "2026-05-14T05:12:00.000Z",
        },
      })
    },
  })

  const capabilities = await client.fetchWalletCapabilities({
    userId: "dapp_user_123",
  })
  const created = await client.createAccountRequest({
    chain: "solana",
    idempotencyKey: "acct_req_key_123",
    label: "Treasury wallet",
    userId: "dapp_user_123",
  })
  const fetched = await client.getAccountRequest({
    accountRequestId: "siwc_acct_req_123",
  })

  assert.equal(capabilities.capabilities.dappId, "dapp_123")
  assert.equal(capabilities.capabilities.policy.policyVersion, 4)
  assert.equal(
    capabilities.capabilities.walletActionsByChain.evm?.transactionSigningStatus,
    "evm_pilot_policy_enabled"
  )
  assert.equal(capabilities.capabilities.accounts[0]?.chain, "solana")
  assert.deepEqual(calls[0]?.body, {
    api_key: "api_key",
    dapp_id: "dapp_123",
    dapp_user_uuid: "dapp_user_123",
  })

  assert.equal(created.idempotencyKey, "acct_req_key_123")
  assert.equal(created.accountRequest.status, "pending_user_approval")
  assert.equal(calls[1]?.headers.get("Idempotency-Key"), "acct_req_key_123")
  assert.deepEqual(calls[1]?.body, {
    api_key: "api_key",
    chain: "solana",
    dapp_id: "dapp_123",
    dapp_user_uuid: "dapp_user_123",
    label: "Treasury wallet",
  })

  assert.equal(fetched.accountRequest.status, "approved")
  assert.equal(fetched.accountRequest.accountId, "account_123")
  assert.equal(fetched.accountRequest.publicAddress, "So1ana111")
  assert.deepEqual(calls.map((call) => call.path), [
    "/api/v3/accounts/capabilities",
    "/api/v3/accounts/requests/create",
    "/api/v3/accounts/requests/get",
  ])
})

test("v3 signing request helpers normalize redacted summaries and risk fields", async () => {
  const calls: Array<{
    body: unknown
    headers: Headers
    path: string
  }> = []
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    dappId: "dapp_123",
    fetch: async (input, init) => {
      const path = new URL(String(input)).pathname
      calls.push({
        body: JSON.parse(String(init?.body)),
        headers: new Headers(init?.headers),
        path,
      })

      if (path.endsWith("/signing/requests/create")) {
        return createJsonResponse({
          data: {
            chain: "evm",
            createdAt: "2026-05-06T12:00:00.000Z",
            expiresAt: "2026-05-06T12:10:00.000Z",
            payloadHash: "hash_123",
            payloadSummary: { kind: "message", preview: "Sign in to Example" },
            policyVersion: 2,
            requestType: "message",
            requiredAcr: "phrh",
            result: null,
            riskLevel: null,
            riskReasons: [],
            signingRequestId: "sr_123",
            status: "pending_user_approval",
            stepUpRequired: false,
            updatedAt: "2026-05-06T12:00:00.000Z",
          },
        })
      }

      if (path.endsWith("/signing/requests/get")) {
        return createJsonResponse({
          data: {
            cancelledAt: null,
            chain: "evm",
            completedAt: "2026-05-06T12:03:00.000Z",
            createdAt: "2026-05-06T12:00:00.000Z",
            errorCode: null,
            errorMessage: null,
            expiresAt: "2026-05-06T12:10:00.000Z",
            payloadHash: "hash_123",
            payloadSummary: { kind: "message", preview: "Sign in to Example" },
            policyDecision: "allowed",
            policyVersion: 2,
            requestType: "message",
            requiredAcr: "phrh",
            result: {
              algorithm: "secp256k1",
              publicAddress: "0xabc123",
              signature: "0xsigned",
              type: "signature",
            },
            riskLevel: "low",
            riskReasons: ["known_app"],
            signingRequestId: "sr_123",
            status: "completed",
            stepUpRequired: false,
            updatedAt: "2026-05-06T12:03:00.000Z",
          },
        })
      }

      if (path.endsWith("/signing/requests/list")) {
        return createJsonResponse({
          data: [
            {
              chain: "evm",
              createdAt: "2026-05-06T12:00:00.000Z",
              payloadHash: "hash_123",
              payloadSummary: { kind: "message", preview: "Sign in to Example" },
              policyDecision: "denied",
              policyVersion: 2,
              requestType: "transaction",
              requiredAcr: "phrh",
              riskLevel: "high",
              riskReasons: ["transaction_signing_deferred"],
              signingRequestId: "sr_456",
              status: "policy_denied",
              stepUpRequired: true,
              transactionContractAddress: "0xcontract",
              transactionDeclaredValueUsd: 42.5,
              transactionOperationType: "transfer",
              transactionRecipient: "0xrecipient",
              updatedAt: "2026-05-06T12:01:00.000Z",
            },
            {
              signingRequestId: "sr_789",
              status: "pending",
            },
          ],
        })
      }

      return createJsonResponse({
        data: {
          cancelledAt: "2026-05-06T12:04:00.000Z",
          chain: "evm",
          createdAt: "2026-05-06T12:00:00.000Z",
          errorCode: "user_cancelled",
          errorMessage: "The user cancelled this request.",
          payloadHash: "hash_123",
          payloadSummary: { kind: "message", preview: "Sign in to Example" },
          policyDecision: "denied",
          policyVersion: 2,
          requestType: "transaction",
          requiredAcr: "phrh",
          result: null,
          riskLevel: "high",
          riskReasons: ["transaction_signing_deferred"],
          signingRequestId: "sr_456",
          status: "cancelled",
          stepUpRequired: true,
          transactionOperationType: "transfer",
          updatedAt: "2026-05-06T12:04:00.000Z",
        },
      })
    },
  })

  const created = await client.createSigningRequest({
    chain: "evm",
    idempotencyKey: "signing_key_123",
    payload: { message: "Sign in to Example" },
    payloadSummary: { kind: "message", preview: "Sign in to Example" },
    requestType: "message",
    userAccountId: "dua_123",
    userId: "dapp_user_123",
  })
  const fetched = await client.getSigningRequest({
    signingRequestId: "sr_123",
  })
  const listed = await client.listSigningRequests({
    userAccountId: "dua_123",
    userId: "dapp_user_123",
  })
  const cancelled = await client.cancelSigningRequest({
    signingRequestId: "sr_456",
  })

  assert.equal(created.idempotencyKey, "signing_key_123")
  assert.equal(created.signingRequest.signingRequestId, "sr_123")
  assert.equal(created.signingRequest.status, "pending_user_approval")
  assert.equal(created.signingRequest.result, null)
  assert.equal(calls[0]?.headers.get("Idempotency-Key"), "signing_key_123")
  assert.deepEqual(calls[0]?.body, {
    api_key: "api_key",
    chain: "evm",
    dapp_id: "dapp_123",
    dapp_user_uuid: "dapp_user_123",
    payload: { message: "Sign in to Example" },
    payload_summary: { kind: "message", preview: "Sign in to Example" },
    request_type: "message",
    user_account_id: "dua_123",
  })

  assert.equal(fetched.signingRequest.status, "completed")
  const fetchedResult = fetched.signingRequest.result
  assert.equal(fetchedResult?.type, "signature")
  assert.equal(
    isCubidSigningSignatureResult(fetchedResult) ? fetchedResult.algorithm : null,
    "secp256k1"
  )
  assert.equal(fetched.signingRequest.policyDecision, "allowed")
  assert.equal(fetched.signingRequest.policyVersion, 2)

  assert.equal(listed.signingRequests[0]?.status, "policy_denied")
  assert.equal(listed.signingRequests[0]?.policyDecision, "denied")
  assert.equal(listed.signingRequests[0]?.transactionRecipient, "0xrecipient")
  assert.equal(listed.signingRequests[0]?.transactionDeclaredValueUsd, 42.5)
  assert.equal(listed.signingRequests[1]?.riskLevel, null)
  assert.deepEqual(listed.signingRequests[1]?.riskReasons, [])

  assert.equal(cancelled.signingRequest.status, "cancelled")
  assert.equal(cancelled.signingRequest.policyDecision, "denied")
  assert.equal(cancelled.signingRequest.errorCode, "user_cancelled")
  assert.equal(cancelled.signingRequest.result, null)

  assert.deepEqual(calls.map((call) => call.path), [
    "/api/v3/signing/requests/create",
    "/api/v3/signing/requests/get",
    "/api/v3/signing/requests/list",
    "/api/v3/signing/requests/cancel",
  ])
})

test("v3 signing request create auto-generates idempotency keys when omitted", async () => {
  let idempotencyKey: string | null = null
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (_input, init) => {
      idempotencyKey = new Headers(init?.headers).get("Idempotency-Key")
      return createJsonResponse({
        data: {
          signingRequestId: "sr_auto",
          status: "pending",
        },
      })
    },
  })

  const response = await client.createSigningRequest({
    payload: { message: "Hello" },
    payloadSummary: { kind: "message", preview: "Hello" },
    requestType: "message",
    userAccountId: "dua_123",
    userId: "dapp_user_123",
  })

  assert.equal(response.idempotencyKey, idempotencyKey)
  assert.match(String(idempotencyKey), /^[0-9a-f-]{36}$/)
})

test("v3 signing request helpers normalize EVM pilot signed transaction results", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () =>
      createJsonResponse({
        data: {
          chain: "evm",
          completedAt: "2026-05-14T05:25:00.000Z",
          createdAt: "2026-05-14T05:20:00.000Z",
          payloadHash: "hash_txn",
          payloadSummary: {
            chain: "evm",
            operation: "contract_call",
          },
          policyDecision: "allowed",
          policyVersion: 4,
          requestType: "transaction",
          requiredAcr: "urn:cubid:acr:passkey",
          result: {
            algorithm: "evm_transaction",
            chainId: 8453,
            publicAddress: "0xabc123",
            signedTransaction: "0xdeadbeef",
            transactionHash: "0xhash123",
            type: "signed_transaction",
          },
          riskLevel: "medium",
          riskReasons: ["contract_allowlisted"],
          signingRequestId: "sr_tx_123",
          status: "completed",
          stepUpRequired: true,
          transactionContractAddress: "0xcontract",
          transactionDeclaredValueUsd: 19.25,
          transactionOperationType: "contract_call",
          transactionRecipient: "0xrecipient",
          updatedAt: "2026-05-14T05:25:00.000Z",
        },
      }),
  })

  const response = await client.getSigningRequest({
    signingRequestId: "sr_tx_123",
  })

  const transactionResult = response.signingRequest.result
  assert.equal(transactionResult?.type, "signed_transaction")
  assert.equal(
    isCubidSignedTransactionResult(transactionResult)
      ? transactionResult.algorithm
      : null,
    "evm_transaction"
  )
  assert.equal(
    isCubidSignedTransactionResult(transactionResult)
      ? transactionResult.signedTransaction
      : null,
    "0xdeadbeef"
  )
})

test("v3 signing request helpers reject malformed successful payloads", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (input) => {
      const path = new URL(String(input)).pathname
      if (path.endsWith("/signing/requests/list")) {
        return createJsonResponse({ data: {} })
      }

      return createJsonResponse("not-an-object")
    },
  })

  await assert.rejects(
    () =>
      client.createSigningRequest({
        payload: { message: "Hello" },
        payloadSummary: { kind: "message", preview: "Hello" },
        requestType: "message",
        userAccountId: "dua_123",
        userId: "dapp_user_123",
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "MALFORMED_RESPONSE")
      assert.equal(error.endpoint, "v3/signing/requests/create")
      return true
    }
  )

  await assert.rejects(
    () => client.listSigningRequests({ userId: "dapp_user_123" }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "MALFORMED_RESPONSE")
      assert.equal(error.endpoint, "v3/signing/requests/list.data")
      return true
    }
  )
})

test("SIWC routes promote browser-safe SIWC error metadata into structured SDK errors", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () =>
      createJsonResponse(
        {
          error: {
            code: "step_up_required",
            details: {
              retryable: true,
              siwcCode: "step_up_required",
              userAction: "use_passkey",
            },
            message: "Passkey step-up is required before approving this signing request.",
            requestId: "passport_123",
          },
        },
        { status: 409 }
      ),
  })

  await assert.rejects(
    () =>
      client.createAccountRequest({
        chain: "evm",
        idempotencyKey: "acct_req_step_up",
        userId: "dapp_user_123",
      }),
    (error) => {
      assert.ok(error instanceof CubidSiwcError)
      assert.ok(isCubidSiwcError(error))
      assert.equal(error.category, "conflict")
      assert.equal(error.siwcCode, "step_up_required")
      assert.equal(error.retryable, true)
      assert.equal(error.userAction, "use_passkey")
      return true
    }
  )
})

test("v3 write helpers auto-generate idempotency keys when callers omit them", async () => {
  let idempotencyKey: string | null = null
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async (_input, init) => {
      idempotencyKey = new Headers(init?.headers).get("Idempotency-Key")
      return createJsonResponse({ success: true })
    },
  })

  const response = await client.saveSecret({
    secret: "secret-value",
    userId: "dapp_user_123",
  })

  assert.equal(response.idempotencyKey, idempotencyKey)
  assert.match(String(idempotencyKey), /^[0-9a-f-]{36}$/)
})

test("v3 idempotency conflicts map to structured conflict errors", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () =>
      createJsonResponse(
        {
          error: {
            code: "idempotency_conflict",
            message: "Idempotency key was reused with a different body.",
            requestId: "passport_123",
          },
        },
        { status: 409 }
      ),
  })

  await assert.rejects(
    () =>
      client.generateAccount({
        chain: "evm",
        idempotencyKey: "idempotency_123",
        userId: "dapp_user_123",
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.category, "conflict")
      assert.equal(error.code, "idempotency_conflict")
      assert.equal(error.status, 409)
      assert.equal(
        error.message,
        "Idempotency key was reused with a different body."
      )
      return true
    }
  )
})

test("verifyCubidWebhookSignature accepts a valid v1 signature", async () => {
  const payload =
    '{"apiVersion":"v3","payloadVersion":"2026-05-03","eventId":"event_123","eventType":"stamp.created","legacyEventType":"credential_added","createdAt":"2026-05-03T22:00:00.000Z","requestId":"passport_123","dapp":{"id":"42"},"subject":{"userId":"dapp_user_123"},"data":{"stampType":"phone"}}'
  const secret = "webhook_secret_123"
  const eventId = "event_123"
  const timestamp = String(Math.floor(Date.now() / 1000))
  const signature = await signWebhookPayload(secret, eventId, timestamp, payload)

  const result = await verifyCubidWebhookSignature({
    eventId,
    payload,
    secret,
    signature: `v1=${signature}`,
    signatureVersion: "v1",
    timestamp,
  })

  assert.equal(result.verified, true)
  assert.equal(result.signatureVersion, "v1")
  assert.equal(result.eventId, eventId)
})

test("verifyCubidWebhookSignature accepts SharedArrayBuffer-backed payloads", async () => {
  const payloadBytes = new TextEncoder().encode("{\"event\":\"wallet.created\"}")
  const shared = new SharedArrayBuffer(payloadBytes.length)
  const payload = new Uint8Array(shared)
  payload.set(payloadBytes)

  const secret = "webhook_secret_123"
  const eventId = "event_sab"
  const timestamp = String(Math.floor(Date.now() / 1000))
  const signature = await signWebhookPayload(secret, eventId, timestamp, payload)

  const result = await verifyCubidWebhookSignature({
    eventId,
    payload,
    secret,
    signature: `v1=${signature}`,
    timestamp,
  })

  assert.equal(result.verified, true)
  assert.equal(result.eventId, eventId)
})

test("verifyCubidWebhookSignature rejects invalid signatures and expired timestamps", async () => {
  await assert.rejects(
    () =>
      verifyCubidWebhookSignature({
        eventId: "event_123",
        now: 1_800_000_000_000,
        payload: "{}",
        secret: "webhook_secret_123",
        signature: "v1=deadbeef",
        timestamp: "1700000000",
        toleranceSeconds: 60,
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "WEBHOOK_TIMESTAMP_EXPIRED")
      return true
    }
  )

  const payload = "{}"
  const secret = "webhook_secret_123"
  const eventId = "event_123"
  const timestamp = String(Math.floor(Date.now() / 1000))

  await assert.rejects(
    () =>
      verifyCubidWebhookSignature({
        eventId,
        payload,
        secret,
        signature: "v1=deadbeef",
        timestamp,
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.category, "auth")
      assert.equal(error.code, "INVALID_WEBHOOK_SIGNATURE")
      return true
    }
  )
})

test("verifyCubidWebhookSignature rejects invalid timestamp, tolerance, and now overrides", async () => {
  await assert.rejects(
    () =>
      verifyCubidWebhookSignature({
        eventId: "event_123",
        now: Number.NaN,
        payload: "{}",
        secret: "webhook_secret_123",
        signature: "v1=deadbeef",
        timestamp: "1700000000",
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "INVALID_WEBHOOK_NOW")
      return true
    }
  )

  await assert.rejects(
    () =>
      verifyCubidWebhookSignature({
        eventId: "event_123",
        payload: "{}",
        secret: "webhook_secret_123",
        signature: "v1=deadbeef",
        timestamp: "1700000000.5",
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "INVALID_WEBHOOK_TIMESTAMP")
      return true
    }
  )

  await assert.rejects(
    () =>
      verifyCubidWebhookSignature({
        eventId: "event_123",
        payload: "{}",
        secret: "webhook_secret_123",
        signature: "v1=deadbeef",
        timestamp: "1700000000",
        toleranceSeconds: Number.POSITIVE_INFINITY,
      }),
    (error) => {
      assert.ok(error instanceof CubidApiError)
      assert.equal(error.code, "INVALID_WEBHOOK_TOLERANCE")
      return true
    }
  )
})

test("parseCubidWebhookEvent preserves canonical and legacy event names", () => {
  const event = parseCubidWebhookEvent<{
    result: string
    signingRequestId: string
  }>({
    apiVersion: "v3",
    payloadVersion: "2026-05-03",
    eventId: "event_123",
    eventType: "wallet.signature.completed",
    legacyEventType: "score_increase",
    createdAt: "2026-05-03T22:00:00.000Z",
    requestId: "passport_123",
    dapp: { id: "42" },
    subject: { userId: "dapp_user_123" },
    data: { result: "signed", signingRequestId: "sr_123" },
  })

  assert.equal(event.eventType, "wallet.signature.completed")
  assert.equal(event.legacyEventType, "score_increase")
  assert.equal(event.data?.result, "signed")
  assert.equal(event.data?.signingRequestId, "sr_123")
  assert.deepEqual(event.subject, { userId: "dapp_user_123" })
})

test("parseCubidWebhookEvent returns null data when the payload omits data", () => {
  const event = parseCubidWebhookEvent<{ stampType: string }>({
    apiVersion: "v3",
    eventId: "event_123",
    eventType: "stamp.created",
  })

  assert.equal(event.data, null)
})

test("stamp registry helpers expose canonical names and ids", () => {
  assert.equal(getCubidStampTypeId("email"), 13)
  assert.equal(getCubidStampTypeId("near-wallet"), 15)
  assert.equal(getCubidStampTypeName(13), "email")
  assert.equal(getCubidStampTypeName(15), "near")
  assert.equal(getCubidStampTypeName(999), "999")
  assert.equal(getCubidStampTypeNamesById()[70], "address")
})

test("normalizeStamps falls back to canonical stamp names when string names are absent", async () => {
  const client = createCubidApiClient({
    apiKey: "api_key",
    baseUrl: "https://passport.cubid.me",
    fetch: async () =>
      createJsonResponse({
        all_stamps: [
          {
            id: 1,
            identity: "user@example.com",
            is_valid: true,
            stamptype: 13,
            uniquevalue: "user@example.com",
          },
        ],
      }),
  })

  const response = await client.fetchStamps({ userId: "dapp_user_123" })

  assert.equal(response.allStamps[0]?.stampType, "email")
  assert.equal(response.allStamps[0]?.stampTypeId, 13)
})

test("app-scoped helpers validate user ids and summarize disclosed stamps", () => {
  assert.deepEqual(createCubidAppScopedSubject("dapp_user_123"), {
    userId: "dapp_user_123",
  })

  const summary = summarizeCubidDisclosedStamp({
    identity: "user@example.com",
    isValid: true,
    stampType: undefined,
    stampTypeId: 13,
    uniqueValue: "user@example.com",
  })

  assert.deepEqual(summary, {
    stampType: "email",
    stampTypeId: 13,
    status: "Verified",
    value: "user@example.com",
  })

  assert.throws(
    () =>
      summarizeCubidDisclosedStamp({
        isValid: true,
        stampType: "email",
        stampTypeId: undefined,
      }),
    (error) =>
      error instanceof CubidApiError &&
      error.code === "INVALID_STAMP_TYPE" &&
      error.endpoint === "stamps/summarize"
  )
})
