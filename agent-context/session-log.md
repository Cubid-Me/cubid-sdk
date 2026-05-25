# Session Log

## session: s83-recoverable-wallet-direction-intake

- Timestamp: 2026-05-25T03:20:52Z
- Summary: Ingested Passport's recoverable-wallet direction reset and opened the SDK-side S14 implementation track.
- Actions:
  - Reviewed the new Passport cross-repo notes for recoverable-wallet SDK direction and browser-safe recovery error taxonomy.
  - Cross-checked the Passport recoverable-wallet roadmap and API docs showing hosted smoke coverage for enrollment, status, release start, release completion, rotation, revocation, and user bundle listing.
  - Added S14 and its implementation subitems to `agent-context/todo.md`.
  - Updated AGENTS guidance, the agent backgrounder, the target-state doc, and repo status so Cubid is now modeled as an identity-bound recovery provider rather than a wallet generator or normal signer for new integrations.
- Validation:
  - Reviewed the current SDK package boundaries and Passport recovery route contracts.
- Follow-up:
  - Implement S14.2 next by adding server-safe recovery bundle wrappers and structured recovery errors in `@cubid/core`.

## session: s84-core-recovery-bundle-helpers

- Timestamp: 2026-05-25T03:25:08Z
- Summary: Added the server-safe recoverable-wallet API v3 wrapper surface and shared browser-safe recovery error taxonomy in `@cubid/core`.
- Actions:
  - Added typed helpers for recovery bundle enroll, status, release-start, rotate, and revoke.
  - Added `CubidRecoverableWalletError`, `isCubidRecoverableWalletError`, and the Passport recoverable-wallet error-code taxonomy.
  - Normalized recovery bundle and release-session responses as safe metadata only, with recovery-sensitive raw fields stripped from SDK raw summaries.
  - Added focused core tests for request bodies, idempotency headers, response normalization, raw redaction, generated idempotency keys, and structured recovery errors.
- Validation:
  - `pnpm exec vitest run packages/core/src/index.test.ts`
  - `pnpm --filter @cubid/core typecheck`
- Follow-up:
  - Add the browser/client `@cubid/wallet-recovery` package for hosted recovery launch, user-authorized release completion, and signed-in bundle visibility.

## session: s82-pr15-comms-publish-workflow-review-fix

- Timestamp: 2026-05-16T05:16:21Z
- Summary: Addressed PR #15 review feedback by making `@cubid/comms` selectable in the trusted-publishing workflow.
- Actions:
  - Added `@cubid/comms` to the manual `package_name` choices in `.github/workflows/publish.yml`.
  - Added the matching resolver case so the workflow maps `@cubid/comms` to `packages/comms` with `jsr_supported=false`.
  - Confirmed the publishing runbook and README already list `@cubid/comms` as npm-only, so no docs correction was needed beyond the workflow.
- Validation:
  - `git diff --check`
- Follow-up:
  - Reply to and resolve the PR #15 review thread after the fix is pushed and CI is green.

## session: s81-cross-repo-comms-passport-intake

- Timestamp: 2026-05-16T02:46:38Z
- Summary: Addressed new inbound cross-repo comms updates from Passport in the SDK mailbox.
- Actions:
  - Accepted the Passport-side resolution update for the SDK wallet helper handoff thread, including downstream SmarTrust readiness boundaries and the fail-closed Solana transaction-signing note.
  - Added the ClearPass Dashboard OIDC SDK readiness thread to the SDK live cross-repo mailbox index after Passport moved the legacy note into the sibling-note structure.
  - Recorded that both inbound updates are coordination-only and require no new SDK runtime implementation in this pass.
- Validation:
  - `git diff --check`
- Follow-up:
  - Continue to leave sibling note changes dirty in other repos unless explicitly asked to commit them there.

## session: s80-pr14-notification-credential-review-fix

- Timestamp: 2026-05-16T02:25:22Z
- Summary: Addressed PR #14 review feedback for the flexible-messaging API v3 notification helpers.
- Actions:
  - Updated `sendNotification` and `getNotificationStatus` so the notification send/status routes serialize the dapp credential as `apikey`, matching the Passport route contracts.
  - Kept the existing `api_key` credential shape for the other API v3 helpers whose contracts already use that field.
  - Updated the notification helper tests to assert the contract-specific credential field for both send and status requests.
- Validation:
  - `pnpm exec vitest run packages/core/src/index.test.ts`
- Follow-up:
  - Reply to and resolve the PR #14 review thread after the fix is committed and pushed.

## session: s79-clearpass-dashboard-auth-thread-response

- Timestamp: 2026-05-15T16:55:00Z
- Summary: Replied to the live ClearPass dashboard auth thread with the published browser-safe Sign in with Cubid package surface and the exact Vite/React integration path.
- Actions:
  - Verified the published npm versions for `@cubid/auth` and `@cubid/auth-react`.
  - Cross-checked the available auth/auth-react exports and the documented ClearPass Vite example path in this repo.
  - Added synchronized replies in the SDK sibling note and the ClearPass owner copy so the blocker thread now has exact package names, React exports, and browser-safety guidance.
- Validation:
  - `npm view @cubid/auth version dist-tags.latest`
  - `npm view @cubid/auth-react version dist-tags.latest`
  - `rg` checks across `packages/auth`, `packages/auth-react`, and `docs/examples/clearpass-dashboard-auth-vite.md`
- Follow-up:
  - The synchronized ClearPass sibling note is now dirty in `/Users/botmaster/src/clearpass` and should be committed there if ClearPass wants the thread update recorded immediately.

## session: s78-clearpass-dashboard-auth-cross-repo-thread

- Timestamp: 2026-05-15T16:43:59Z
- Summary: Migrated the ClearPass dashboard Sign in with Cubid blocker into the new cross-repo mailbox protocol.
- Actions:
  - Added the SDK sibling note under `agent-context/cross-repo-comms/` with shared `thread_id`, related repo metadata, sibling paths, status, legacy-note reference, and dated log entries.
  - Added the ClearPass owner note in the ClearPass repo so future substantive edits can update both siblings in the same working session.
  - Updated the cross-repo comms README current-thread list so SDK-side agents can discover the ClearPass dashboard auth blocker.
- Validation:
  - Manual structure check against `agent-context/cross-repo-comms/README.md` and the existing wallet handoff thread.
- Follow-up:
  - SDK-side work should reply in the cross-repo thread with the browser-safe Sign in with Cubid package/API names, exact imports, and a Vite/React usage path once available.

## session: s77-cross-repo-wallet-handoff-response

- Timestamp: 2026-05-15T15:00:00Z
- Summary: Addressed the live SDK wallet handoff inbox thread by replying with the published helper surface, exact exported names, and the remaining Solana signing gap.
- Actions:
  - Reviewed the new cross-repo mailbox protocol and the live `sdk-wallet-release-handoff` sibling thread under `agent-context/cross-repo-comms/`.
  - Verified the published npm versions for the relevant wallet helper packages and cross-checked the exported helper names in `@cubid/core` and `@cubid/browser`.
  - Added a synchronized reply in both the SDK sibling note and the Passport owner copy so downstream agents now have a concrete readiness answer for EVM/Solana account creation, signing-request flows, hosted approval launchers, and the still-disabled Solana transaction-signing path.
- Validation:
  - `npm view @cubid/core version dist-tags.latest`
  - `npm view @cubid/browser version dist-tags.latest`
  - `npm view @cubid/near version dist-tags.latest`
  - `npm view @cubid/solana version dist-tags.latest`
  - `rg` export checks in `packages/core/src/index.ts` and `packages/browser/src/index.ts`
- Follow-up:
  - The sibling Passport note is now dirty in `/Users/botmaster/src/cubid/cubid-passport` and should be committed there if the Passport repo wants the synchronized thread update recorded immediately.

## session: s76-notification-history-boundary

- Timestamp: 2026-05-15T07:12:00Z
- Summary: Closed the last flexible-messaging roadmap todo by making the Passport-user notification history boundary explicit across the repo guidance.
- Actions:
  - Updated `AGENTS.md`, the backgrounder, the SDK target-state doc, and the repo-status snapshot so `POST /api/notifications/history/list` is consistently treated as a signed-in profile route rather than a normal dapp-facing `@cubid/core` helper.
  - Marked `S13.9` complete in `agent-context/todo.md` so the flexible-messaging roadmap now records the history-route exclusion as an explicit completed boundary decision.
- Validation:
  - `git diff --check`
- Follow-up:
  - The next clean roadmap move is to decide whether the broader `S13` parent should now be marked complete or kept open for future delivery-history refinements beyond the current send/status/profile split.

## session: s75-core-notification-status-helper

- Timestamp: 2026-05-15T06:58:00Z
- Summary: Added the first server-safe notification status helper so accepted flexible-messaging events can be tracked through a redacted app-scoped status surface.
- Actions:
  - Added `getNotificationStatus(...)` plus typed notification status and delivery-attempt summaries on `@cubid/core` for the dapp-authenticated `POST /api/v3/notifications/status` route.
  - Kept the normalized response redacted to event status, selected channel type, latest delivery state, and delivery-attempt metadata without exposing destinations, ciphertext, provider secrets, or cross-app event visibility.
  - Updated the core README and server-integration guide to position `getNotificationStatus` as the follow-up helper after an accepted send while keeping Passport-user history routes out of ordinary dapp SDK usage.
- Validation:
  - `pnpm --filter @cubid/core build`
  - `pnpm exec vitest run packages/core/src/index.test.ts`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
- Follow-up:
  - Move into `S13.9` and make the Passport-user history-route exclusion explicit in the roadmap and package-boundary docs.

## session: s74-core-notification-send-errors

- Timestamp: 2026-05-15T06:42:00Z
- Summary: Hardened the flexible-messaging send helper so accepted sends and denied sends now come back as distinct typed SDK outcomes.
- Actions:
  - Added `CubidNotificationSendError`, `isCubidNotificationSendError`, and stable notification send error-code typing so Passport send-route denials are no longer surfaced as generic transport-looking failures.
  - Classified the key Passport messaging denials and in-flight outcomes with retryability hints while keeping `status: "accepted"` documented as routing acceptance rather than proof of provider delivery.
  - Updated the core README and server-integration guide so backend consumers know how to distinguish accepted sends from policy, grant, quota, provider, and request-in-progress failures.
- Validation:
  - `pnpm --filter @cubid/core build`
  - `pnpm exec vitest run packages/core/src/index.test.ts`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
- Follow-up:
  - Move into `S13.8` and add the server-safe notification status helper so accepted events can be tracked after the initial send response.

## session: s73-core-notification-send-helper

- Timestamp: 2026-05-15T06:28:00Z
- Summary: Added the first server-safe flexible-messaging send helper to `@cubid/core` so dapp backends can enqueue notification events without exposing delivery internals.
- Actions:
  - Added `sendNotification(...)` plus typed notification categories, priorities, accepted-send response metadata, and `createNotificationIdempotencyKey()` on the runtime-agnostic core client.
  - Normalized the `POST /api/v3/notifications/send` contract to safe routing metadata only, preserving idempotency while keeping raw destinations, provider secrets, ciphertext, and hosted Allow Page grant state out of the public SDK surface.
  - Updated the core README and the Next.js/Supabase Edge integration guide so backend consumers know this helper is server-only and must keep Cubid dapp API keys off the browser.
- Validation:
  - `pnpm --filter @cubid/core build`
  - `pnpm exec vitest run packages/core/src/index.test.ts`
  - `pnpm docs:api:build`
- Follow-up:
  - Move into `S13.7` and harden the send helper semantics around accepted-versus-delivered state plus stable messaging error normalization.

## session: s72-comms-allow-page-grant-model

- Timestamp: 2026-05-15T05:52:52Z
- Summary: Completed the Allow Page grant modeling slice by adding shared category-permission helpers in `@cubid/comms` without wrapping the hosted routes directly.
- Actions:
  - Added canonical notification category constants plus typed Allow Page grant summaries and small permission-state helpers for active-category evaluation.
  - Kept the hosted Allow Page boundary intact by modeling grants as category permission state only instead of channel access or route wrappers.
  - Updated the comms README so the package now documents the permission-model helpers alongside the signed-in channel and preference surfaces.
- Validation:
  - `pnpm --filter @cubid/comms build`
  - `pnpm exec vitest run packages/comms/src/index.test.ts`
  - `pnpm docs:api:build`
- Follow-up:
  - Flexible messaging work can now move out of `@cubid/comms` and into the server-safe `@cubid/core` send and status helpers.

## session: s71-comms-global-preferences

- Timestamp: 2026-05-15T05:50:33Z
- Summary: Added the signed-in global notification preference helpers to `@cubid/comms` while keeping the surface limited to Passport-user category defaults.
- Actions:
  - Added `preferences.list()` and `preferences.update(...)` so Passport-user global category defaults can be fetched and updated through the same bearer-authenticated comms client.
  - Normalized public preference metadata for `SECURITY`, `TRANSACTIONAL`, and `WORKFLOW`, including category, selected channel id, priority floor, status, and timestamps without exposing raw channel destinations.
  - Updated the comms README so the current package scope now covers both channel management and global preference management.
- Validation:
  - `pnpm --filter @cubid/comms build`
  - `pnpm exec vitest run packages/comms/src/index.test.ts`
  - `pnpm docs:api:build`
- Follow-up:
  - Move into `S13.5` and decide whether the Allow Page category-grant helper should be implemented now or remain Passport-hosted despite the route existing.

## session: s70-comms-channel-verification

- Timestamp: 2026-05-15T05:45:08Z
- Summary: Added the signed-in notification channel verification lifecycle helpers to `@cubid/comms` using the real Passport start/complete verification contract.
- Actions:
  - Added `channels.startVerification(...)` for email and Telegram channel setup, including the redacted channel summary plus typed challenge metadata such as `challengeId`, expiry, provider key, and optional Telegram setup guidance.
  - Added `channels.completeVerification(...)` so callers can finish a verification challenge and receive the updated verified channel summary without exposing raw destinations or provider secrets.
  - Updated the comms README so the current package scope now covers both channel metadata and verification lifecycle helpers.
- Validation:
  - `pnpm --filter @cubid/comms build`
  - `pnpm exec vitest run packages/comms/src/index.test.ts`
  - `pnpm docs:api:build`
- Follow-up:
  - Move into `S13.4` and add the global notification preference helpers on top of the same signed-in bearer-authenticated client boundary.

## session: s69-comms-channel-metadata

- Timestamp: 2026-05-15T05:45:08Z
- Summary: Added the first signed-in notification channel metadata helpers to `@cubid/comms` using the real Passport user-route contract.
- Actions:
  - Extended `createCubidCommsClient` with `channels.list()` and `channels.update(...)` so Passport-user channel metadata can be fetched and updated through bearer-authenticated requests.
  - Added typed redacted channel summaries covering channel id/type, provider key, label, masked display hint, default and verification flags, lifecycle status, and timestamps without exposing raw destinations or provider internals.
  - Updated the package README so the new signed-in channel metadata helpers are documented as part of the current `@cubid/comms` scope.
- Validation:
  - `pnpm --filter @cubid/comms build`
  - `pnpm exec vitest run packages/comms/src/index.test.ts`
  - `pnpm docs:api:build`
- Follow-up:
  - Move into `S13.3` and add the channel verification lifecycle wrappers on top of the same bearer-authenticated client boundary.

## session: s68-comms-package-boundary

- Timestamp: 2026-05-15T05:40:38Z
- Summary: Implemented the first `@cubid/comms` package slice to make the flexible-messaging package boundary real before adding any channel or preference helpers.
- Actions:
  - Added `packages/comms` with a minimal signed-in Passport-user client boundary, package metadata, README, and focused tests that keep the package free of `@cubid/core`, browser, and React dependency edges.
  - Wired `@cubid/comms` into the repo package matrix, TypeScript aliases, unit-test prebuild path, Vitest coverage/test config, and machine-readable API reference generation.
  - Updated the publishing policy and roadmap state so `S13.1` is now complete and the next work can land directly in `@cubid/comms`.
- Validation:
  - `pnpm --filter @cubid/comms build`
  - `pnpm exec vitest run packages/comms/src/index.test.ts`
- Follow-up:
  - Move directly into `S13.2` to add the first signed-in channel metadata helpers on top of this package boundary.

## session: s67-flexible-messaging-roadmap-intake

- Timestamp: 2026-05-15T00:40:00Z
- Summary: Ingested the new flexible messaging Passport notes as deferred SDK roadmap input and opened a future account-management track instead of adding runtime code now.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-allow-page-grants.md` and `agent-context/messages-from-cubid-passport/2026-05-14-flexible-messaging-passport-channel-routes.md`.
  - Reviewed the later flexible-messaging handoff notes for `send`, email, Telegram, abuse controls, and status/history so the roadmap now reflects both the signed-in profile surface and the future server-safe dapp send/status surface.
  - Added `S13` and its sub-items to `agent-context/todo.md` so future signed-in messaging channels, verification, preferences, Allow Page category-grant modeling, and later server-safe send/status helpers are tracked as one coherent deferred expansion area.
  - Updated package-boundary guidance so future signed-in messaging profile helpers land in a later `@cubid/comms` package family, while future dapp notification send and status helpers remain a possible `@cubid/core` concern once the messaging roadmap is explicitly promoted.
- Validation:
  - Reviewed the current package-boundary docs, roadmap state, and the new Passport notes after the edits.
- Follow-up:
  - No runtime SDK implementation is requested yet; the next clean move after this intake is to yeet the completed `S03` branch once the inbox is committed cleanly.

## session: s66-web3-compatibility-closeout

- Timestamp: 2026-05-15T00:05:00Z
- Summary: Closed out the remaining `@cubid/web3` roadmap items by freezing the shared wallet surface, publishing downstream migration guidance, and moving the package out of the normal release path.
- Actions:
  - Marked `@cubid/web3` as a frozen legacy compatibility package in package metadata, public docs, and package-boundary guidance, and made the supported legacy stamp families explicit in the shared type surface.
  - Removed `@cubid/web3` from the normal publish workflow choices so future releases are treated as manual compatibility exceptions rather than active package work.
  - Added `docs/engineering/web3-migration-guide.md` and updated the package matrix, publishing policy, migration plan, roadmap files, and agent guidance so dedicated chain packages are the only forward-looking wallet targets.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm validate:yeet`
- Follow-up:
  - The current public SDK roadmap is now closed through the planned chain-package split and `@cubid/web3` compatibility freeze.

## session: s65-stellar-package-slice

- Timestamp: 2026-05-14T23:45:00Z
- Summary: Continued `S03` by extracting `@cubid/stellar` as the final currently planned bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/stellar` with Stellar-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Stellar identity for default stamp serialization while preserving optional `federationAddress`, `networkPassphrase`, and `publicKey` metadata.
  - Wired `@cubid/stellar` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm exec vitest run packages/stellar/src/client.test.ts`
  - `pnpm validate:yeet`
- Follow-up:
  - Move from chain extraction into the remaining `@cubid/web3` compatibility-closeout tasks.

## session: s64-tezos-package-slice

- Timestamp: 2026-05-14T23:05:00Z
- Summary: Continued `S03` by extracting `@cubid/tezos` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/tezos` with Tezos-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Tezos identity for default stamp serialization while preserving optional `curve`, `networkId`, and `publicKey` metadata.
  - Wired `@cubid/tezos` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm exec vitest run packages/tezos/src/client.test.ts`
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slice for Stellar.

## session: s63-aptos-package-slice

- Timestamp: 2026-05-14T22:25:00Z
- Summary: Continued `S03` by extracting `@cubid/aptos` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/aptos` with Aptos-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Aptos identity for default stamp serialization while preserving optional `authenticationKey`, `chainId`, `networkId`, and `publicKey` metadata.
  - Wired `@cubid/aptos` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm exec vitest run packages/aptos/src/client.test.ts`
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slices such as Tezos and Stellar.

## session: s62-polkadot-package-slice

- Timestamp: 2026-05-14T21:45:00Z
- Summary: Continued `S03` by extracting `@cubid/polkadot` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/polkadot` with Polkadot-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Polkadot identity for default stamp serialization while preserving optional `genesisHash`, `publicKey`, and `ss58Format` metadata.
  - Wired `@cubid/polkadot` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm exec vitest run packages/polkadot/src/client.test.ts`
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slices such as Aptos, Tezos, and Stellar.

## session: s61-web3-compatibility-closeout-planning

- Timestamp: 2026-05-14T21:00:00Z
- Summary: Started the `@cubid/web3` compatibility-closeout path by turning it into a concrete tracked migration and deprecation plan.
- Actions:
  - Audited the remaining public `@cubid/web3` surface and confirmed it is now a small legacy shared-wallet package with its own adapter boundary, capability helpers, and a still-published npm package.
  - Expanded `S03` with explicit `@cubid/web3` closeout follow-ups covering surface freeze, migration messaging, release-policy narrowing, downstream migration guidance, and the final long-term compatibility decision.
  - Updated the package-migration and target-state docs so future work treats `@cubid/web3` as a legacy compatibility surface that should stop absorbing new chain-specific behavior.
- Validation:
  - Reviewed the live `packages/web3` surface, README, and repo-wide references before updating the roadmap and engineering docs.
- Follow-up:
  - Continue with the next dedicated chain-package slices in parallel with the `@cubid/web3` closeout steps, but do not add new chain-specific helpers to `@cubid/web3`.

## session: s59-cosmos-package-slice

- Timestamp: 2026-05-14T20:05:00Z
- Summary: Continued `S03` by extracting `@cubid/cosmos` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/cosmos` with a Cosmos-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Cosmos identity for default stamp serialization while preserving optional `publicKey`, `chainId`, and `bech32Prefix` metadata.
  - Wired `@cubid/cosmos` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slices such as Polkadot, Aptos, Tezos, and Stellar.

## session: s58-starknet-package-slice

- Timestamp: 2026-05-14T19:35:00Z
- Summary: Continued `S03` by extracting `@cubid/starknet` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/starknet` with a Starknet-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Starknet identity for default stamp serialization while preserving optional `publicKey`, `chainId`, and `classHash` metadata.
  - Wired `@cubid/starknet` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slices such as Cosmos, Polkadot, Aptos, Tezos, and Stellar.

## session: s57-bitcoin-package-slice

- Timestamp: 2026-05-14T19:05:00Z
- Summary: Continued `S03` by extracting `@cubid/bitcoin` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/bitcoin` with a Bitcoin-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept wallet `address` as the primary Bitcoin identity for default stamp serialization while preserving optional `publicKey`, `networkId`, and `scriptType` metadata.
  - Wired `@cubid/bitcoin` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm exec vitest run packages/bitcoin/src/client.test.ts`
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the remaining bounded chain-package slices such as Starknet, Cosmos, Polkadot, Aptos, Tezos, and Stellar.

## session: s56-cardano-package-slice

- Timestamp: 2026-05-14T18:15:00Z
- Summary: Continued `S03` by extracting `@cubid/cardano` as the next bounded chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/cardano` with a Cardano-specific client, types, capability helpers, package metadata, and focused tests.
  - Kept `address` as the primary Cardano identity for default stamp serialization while preserving optional `stakeAddress`, `networkId`, and `chainType` metadata.
  - Wired `@cubid/cardano` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
- Validation:
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with the eventual `@cubid/web3` compatibility closeout or any remaining release work for the newly extracted chain packages.

## session: s55-sui-package-slice

- Timestamp: 2026-05-14T17:15:00Z
- Summary: Continued `S03` by extracting `@cubid/sui` as the next concrete chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/sui` with a Sui-specific client, types, capability helpers, package metadata, and focused tests.
  - Normalized Sui wallet addresses to canonical lowercase `0x...` strings on the package surface before verification and default stamp serialization.
  - Wired `@cubid/sui` into the root TypeScript aliases, Vitest coverage and test projects, publish workflow choices, machine-readable API reference generation, and the package-family docs and roadmap artifacts.
  - Refreshed the publishing runbook's current verified registry state so the operator notes match the packages that are already live on npm today.
- Validation:
  - `pnpm validate:yeet`
- Follow-up:
  - Continue `S03` with later chain-specific slices or the eventual `@cubid/web3` compatibility closeout once the next bounded package step is chosen.

## session: s54-s03-persistence-guard-followup

- Timestamp: 2026-05-14T16:20:00Z
- Summary: Tightened the NEAR and Solana verification helpers so stamp persistence fails before any wallet verification prompt when the required persistence context is missing.
- Actions:
  - Updated `@cubid/near` to validate `userId` and `pageId` before calling `adapter.verify(...)` when `persistStamp` is enabled.
  - Mirrored the same guard ordering in `@cubid/solana` so the chain-specific helpers stay behaviorally aligned with the EVM package.
  - Added focused test coverage that asserts both packages now throw before verification is invoked, and cleaned up duplicate package bullets plus a small `@cubid/web3` README wording issue while touching the chain-split docs.
- Validation:
  - `pnpm exec vitest run packages/near/src/client.test.ts packages/solana/src/client.test.ts`
  - `git diff --check`
- Follow-up:
  - Continue `S03` with the next real chain package slice rather than broad `@cubid/web3` refactoring.

## session: s49-clearpass-auth-handoff

- Timestamp: 2026-05-14T00:55:02Z
- Summary: Implemented `S04.4` by writing the package, environment, and usage handoff note back to ClearPass now that the auth packages and example are in place.
- Actions:
  - Wrote the outbound ClearPass coordination note at `/Users/botmaster/src/clearpass/agent-context/messages-from-cubid/2026-05-14-dashboard-sign-in-with-cubid-sdk-handoff.md`.
  - Included package names, current implementation commit refs, install shape, public env vars, issuer URLs, supported scopes, callback setup, minimal React usage, validation evidence, and the remaining Passport-side relying-party blocker.
  - Closed out the parent `S04` auth-package roadmap now that `S04.1` through `S04.4` are complete.
- Validation:
  - Reviewed the handoff note against the implemented `@cubid/auth`, `@cubid/auth-react`, and ClearPass Vite example surfaces.
- Follow-up:
  - Continue with the remaining non-closed SDK roadmap items outside the ClearPass auth track.

## session: s48-clearpass-vite-auth-example

- Timestamp: 2026-05-14T00:53:30Z
- Summary: Implemented `S04.3` by adding a ClearPass-oriented Vite/React auth example that shows how to consume `@cubid/auth` and `@cubid/auth-react`.
- Actions:
  - Added `docs/examples/clearpass-dashboard-auth-vite.md` with public env vars, provider wiring, callback handling, sign-in and sign-out usage, and server-side authorization notes for ClearPass.
  - Linked the new example from the root README and the `@cubid/auth-react` package README so consumers can find the example from the main public entrypoints.
- Validation:
  - `git diff --check`
  - Reviewed the example against the staged `@cubid/auth` and `@cubid/auth-react` public APIs.
- Follow-up:
  - Implement `S04.4` next by writing the explicit package/env handoff note back to ClearPass.

## session: s47-auth-react-session-bindings

- Timestamp: 2026-05-14T00:50:59Z
- Summary: Implemented `S04.2` by adding `@cubid/auth-react` as the React session layer on top of the new Sign in with Cubid auth foundation.
- Actions:
  - Added `packages/auth-react` with a client-safe auth provider, sign-in/sign-out buttons, callback handling helper, session restore and clear behavior, and React hooks around `@cubid/auth`.
  - Extended acceptance coverage with a built-package `@cubid/auth-react` consumer scenario and wired the new package into root TypeScript paths, Vitest, publishing choices, API-reference generation, and package-boundary docs.
  - Updated public repo guidance so `@cubid/auth-react` is now treated as the supported React session layer instead of a future package idea.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:coverage`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`
- Follow-up:
  - Implement `S04.3` next by adding the ClearPass-oriented Vite auth example that consumes `@cubid/auth` and `@cubid/auth-react`.

## session: s46-auth-foundation-package

- Timestamp: 2026-05-14T00:36:04Z
- Summary: Implemented `S04.1` by adding the public `@cubid/auth` package as the runtime-agnostic Sign in with Cubid OIDC and PKCE foundation.
- Actions:
  - Added `packages/auth` with browser-safe OIDC discovery, PKCE, state and nonce generation, authorization URL building, callback parsing, token exchange helpers, userinfo helpers, logout helpers, ID token claim decoding, and storage-agnostic session helpers.
  - Extended the consumer acceptance harness with an `@cubid/auth` scenario and wired the new package into root TypeScript, Vitest, publishing, README, target-state, testing-strategy, and API-reference generation surfaces.
  - Generated the new machine-readable API reference artifact for `@cubid/auth` and updated the public package matrix so the auth foundation is documented as npm-only and outside the current JSR policy.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test`
  - `pnpm test:coverage`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`
- Follow-up:
  - Implement `S04.2` next by adding the React session bindings on top of `@cubid/auth`.

## session: s45-clearpass-dashboard-auth-roadmap

- Timestamp: 2026-05-14T00:09:05Z
- Summary: Ingested the ClearPass Dashboard Sign in with Cubid blocker and split the existing auth-package roadmap into concrete public SDK follow-ups.
- Actions:
  - Reviewed the incoming ClearPass note requesting browser-safe Dashboard authentication through Sign in with Cubid without privileged browser credentials.
  - Added the Passport handoff note describing the OIDC public-web PKCE contract, issuer endpoints, expected callback/token behavior, and ClearPass as the first consumer.
  - Marked `S04` started on `codex/clearpass-dashboard-auth-roadmap`.
  - Split `S04` into `S04.1` for `@cubid/auth`, `S04.2` for `@cubid/auth-react`, `S04.3` for the Vite ClearPass Dashboard auth example, and `S04.4` for the reply note back to ClearPass.
- Validation:
  - `git diff --check`
- Follow-up:
  - Implement `S04.1` first, then continue through the React bindings, Vite example, and ClearPass reply note.

## session: s44-pr8-release-review-followup

- Timestamp: 2026-05-13T13:10:00Z
- Summary: Addressed the open PR #8 release-review comments by tightening the ClearPass helper contract and bumping the newly changed browser and React package versions for publication.
- Actions:
  - Bumped `@cubid/browser` and `@cubid/react` from `0.1.1` to `0.1.2` so the new public ClearPass helper exports are publishable from the release branch.
  - Made `ClearPassVerifyUrlRequest.pageId` required and added an explicit ClearPass-side `pageId` assertion before delegating to the shared hosted URL builder.
  - Narrowed the public capability helper parameters in `@cubid/evm` and `@cubid/web3` to string keys only, avoiding accidental numeric capability names from index-signature widening.
  - Regenerated the machine-readable API reference artifacts so the manifest and package snapshots reflect the release-candidate package versions.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`

## session: s43-pr7-api-reference-determinism-fix

- Timestamp: 2026-05-10T22:10:00Z
- Summary: Fixed the remaining PR #7 CI failure by making the machine-readable API reference artifacts stable across clean environments.
- Actions:
  - Reproduced the failing `pnpm docs:api:check` step from PR #7 in a clean checkout and confirmed the drift was isolated to `docs/reference/api/core.json`.
  - Traced the drift to environment-specific `typedoc` graph bookkeeping such as numeric reflection IDs and derived lookup maps rather than a real SDK API surface change.
  - Updated `scripts/build-api-reference.mjs` so the committed JSON artifacts now strip unstable internal `typedoc` fields while preserving the useful package API structure for tooling ingestion.
  - Regenerated the checked-in API reference artifacts after the normalization fix so CI and clean clones compare against the new deterministic baseline.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm check:core-package`

## session: s42-pr7-review-followup

- Timestamp: 2026-05-10T21:15:00Z
- Summary: Addressed the open review threads on PR #7 by restoring real API-reference drift protection in CI and tightening a few public helper type surfaces.
- Actions:
  - Removed the pre-check `docs:api:build` step from CI so `docs:api:check` once again validates the committed reference artifacts instead of overwriting them first.
  - Hardened the API reference drift checker so it now also fails on unexpected stale files under `docs/reference/api/`, not just changed expected files.
  - Simplified the capability helper signatures in `@cubid/evm` and `@cubid/web3` by dropping redundant `| string` unions from index-signature-backed capability names.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`

## session: s41-ci-fix-and-clearpass-verify-helper

- Timestamp: 2026-05-10T01:20:00Z
- Summary: Fixed the PR #7 clean-run CI failure and turned the ClearPass Verify inbox note into a real browser and React helper surface.
- Actions:
  - Diagnosed the failing PR CI run and confirmed `pnpm test:unit` was depending on leftover built package entrypoints for `@cubid/browser` and `@cubid/evm` that do not exist on a fresh runner.
  - Updated `pnpm test:unit` and the testing strategy so the unit test command now prepares the minimal built entrypoints it needs before running Vitest, keeping the CI order intact while removing the clean-run dependency on local artifacts.
  - Added `buildClearPassVerifyUrl(...)` and extended the hosted verification helper surface so `clearpass_verify` now launches the Cubid-hosted ClearPass URL instead of exposing any direct ClearPass integration path.
  - Added `ClearPassVerifyButton` to `@cubid/react`, kept the copy branded as a third-party ClearPass flow, and reused the existing post-popup stamp refresh behavior.
  - Expanded browser and React tests plus package READMEs, and closed `S11` in the roadmap.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`

## session: s40-s10-developer-ingestion-publishing

- Timestamp: 2026-05-09T13:30:00Z
- Summary: Finished `S10` by locking the package registry policy, adding machine-readable API reference artifacts, and tightening the public developer entrypoints across the SDK package family.
- Actions:
  - Reviewed the incoming Passport note `agent-context/messages-from-cubid-passport/2026-05-09-clearpass-verify-stamp.md` and turned it into a new tracked SDK follow-up instead of leaving it as an unstructured inbox file.
  - Updated the root README, package READMEs, package metadata, and Supabase Edge integration guide so new consumers can see the supported package names, registry availability, and the right package to choose first.
  - Expanded the publishing runbook into a package-family policy document and made the GitHub publish workflow describe JSR support for `@cubid/core` as an explicit policy choice rather than an accidental limitation.
  - Added a committed machine-readable reference surface under `docs/reference/api/` plus `docs/reference/README.md`, with a deterministic `typedoc`-based generator and a drift check command for CI.
  - Updated CI so API reference generation and drift checks are part of the normal validation baseline.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`

## session: s39-s02-compatibility-retirement

- Timestamp: 2026-05-09T11:20:00Z
- Summary: Closed out `S02` by retiring `@cubid/web2` and `@cubid/web2-react` as frozen compatibility shims and removing them from the normal release path.
- Actions:
  - Updated `@cubid/web2` and `@cubid/web2-react` metadata and READMEs so they now present themselves as frozen deprecated wrappers instead of temporary first-class migration packages.
  - Updated the root README, agent guidance, target-state docs, and migration plan so `@cubid/browser` and `@cubid/react` are the only supported long-term package names.
  - Removed `@cubid/web2` and `@cubid/web2-react` from the normal `Publish Packages` workflow options while keeping the packages in the workspace as installable re-export shims.
  - Recorded the exact post-merge npm deprecation commands and messages for the retired package names in the publishing runbook instead of unpublishing them.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm check:core-package`

## session: s38-testing-baseline-and-acceptance-harness

- Timestamp: 2026-05-07T14:05:00Z
- Summary: Finished `S09` by standardizing the repo on Vitest, adding a consumer-style acceptance harness, and documenting coverage governance.
- Actions:
  - Migrated `@cubid/core` onto the shared Vitest runner so the repo now has one primary package-test pipeline instead of a mixed `node:test` and Vitest split.
  - Added `packages/acceptance` as a private workspace package that exercises the built `@cubid/core`, `@cubid/browser`, and `@cubid/react` package surfaces the way a local consumer would.
  - Added `docs/engineering/testing-strategy.md` to define the test layers, local validation commands, CI-required validation, and the report-now/gate-later coverage policy.
  - Updated root scripts and CI so lint, typecheck, unit tests, build, acceptance tests, coverage reporting, and core package dry-runs are distinct and intentional steps.
- Validation:
  - `pnpm install`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm test:acceptance`
  - `pnpm test:coverage`
  - `pnpm check:core-package`

## session: s37-s03-capability-driven-chain-surface

- Timestamp: 2026-05-07T12:35:00Z
- Summary: Finished the current `S03.6` tranche by making the EVM, wagmi, and interim web3 package surfaces capability-driven instead of implicitly smart-account-oriented.
- Actions:
  - Added optional connection/result `capabilities` metadata to `@cubid/evm` and the interim `@cubid/web3` package surfaces.
  - Exported explicit helper functions for capability checks so apps can branch on `smartAccount`, `sessionKeys`, `paymaster`, and `gasSponsorship` support without assuming those features exist everywhere.
  - Updated the wagmi adapter and hook so connector-provided capability metadata can flow through to React consumers.
  - Updated chain-package docs and the migration plan so future chain work keeps capability signaling explicit and opt-in.
- Validation:
  - `pnpm test`
  - `pnpm typecheck`
  - `pnpm build`

## session: s36-pr6-review-followup

- Timestamp: 2026-05-07T00:10:00Z
- Summary: Addressed the first PR #6 Copilot and Codex review round on the SIWC core release follow-up branch.
- Actions:
  - Tightened signing-request risk and policy normalization so unsupported or omitted upstream values collapse to `null` instead of leaking `undefined` or unsound closed-union casts.
  - Corrected the core README so `listSigningRequests` only documents the currently supported public filters.
  - Made the wallet-signature webhook parsing test use a self-explanatory wallet-oriented payload instead of stamp-shaped data.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

## session: s35-testing-and-distribution-roadmap-extension

- Timestamp: 2026-05-06T23:40:00Z
- Summary: Extended the active roadmap to cover testing strategy, local acceptance validation, coverage governance, and broader developer-ingestion publishing surfaces.
- Actions:
  - Added `S09` to `todo.md` for an explicit SDK testing strategy, local acceptance harness, and coverage governance decision.
  - Added `S10` to `todo.md` for broader API and SDK publication to developer-ingestion surfaces beyond the existing npm and JSR baseline.
  - Updated `repo-status.md` so the remaining testing and distribution gaps now reference the new roadmap items directly.
- Validation:
  - Reviewed the updated roadmap and repo-status entries against the current package and publishing state.

## session: s34-repo-cleanup-control-plane

- Timestamp: 2026-05-06T23:20:00Z
- Summary: Ran a safe repo-cleanup pass focused on missing control-plane files and repo-governance alignment rather than feature-code changes.
- Actions:
  - Added `agent-context/repo-status.md` as the durable lightweight cleanup snapshot for repo standards.
  - Added `agent-context/future-ideas.md` with an explicit warning that it is not active roadmap work.
  - Updated `AGENTS.md` with the `dev`/`main` branch flow and a clear note that the Supabase direct-access audit does not apply to this SDK repo.
  - Updated `README.md` so the root docs point to the new repo-status and future-ideas control files and reflect the actual integration/release workflow.
- Validation:
  - Reviewed the updated docs and control-plane files against the current repo structure, workflows, and roadmap state.

## session: s33-siwc-signing-surface

- Timestamp: 2026-05-06T22:45:00Z
- Summary: Implemented the first public SIWC signing-request lifecycle surface in `@cubid/core` and extended the webhook docs and event types for SIWC wallet events.
- Actions:
  - Added SIWC wallet event names to `CubidWebhookEventType` while keeping the existing webhook verification contract unchanged.
  - Added `createSigningRequest`, `getSigningRequest`, `listSigningRequests`, and `cancelSigningRequest` to `@cubid/core` as runtime-agnostic API v3 helpers.
  - Added shared public signing-request request and response types, including redacted summaries, additive SIWC05 risk fields, and create-route idempotency handling.
  - Kept transaction-signing flows fail-closed in normalized summaries and docs so policy metadata does not imply signature enablement.
  - Updated the public core README and Next/Supabase integration guide to document the new SIWC signing methods, redacted summary model, and additive wallet webhook event names.
  - Bumped `@cubid/core` package and JSR manifests from `0.1.1` to `0.1.2` because this adds new public API surface.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

## session: s32-pr5-sharedarraybuffer-followup

- Timestamp: 2026-05-06T14:05:00Z
- Summary: Addressed the remaining PR #5 webhook review edge case by making webhook signature verification safe for SharedArrayBuffer-backed byte views.
- Actions:
  - Updated the internal `toArrayBuffer` helper to avoid calling `.buffer.slice(...)` on non-ArrayBuffer-backed views and to copy through `Uint8Array#slice()` when needed.
  - Preserved the zero-copy fast path for full ArrayBuffer-backed views.
  - Expanded the core webhook tests so `verifyCubidWebhookSignature` now explicitly covers SharedArrayBuffer-backed payload input.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

## session: s31-pr5-review-followup

- Timestamp: 2026-05-06T13:20:00Z
- Summary: Addressed the first PR #5 review round by making the webhook helper contracts stricter and bumping `@cubid/core` for a publishable next release.
- Actions:
  - Bumped `packages/core/package.json` and `packages/core/jsr.json` to `0.1.1` so the newly added public core APIs can be released instead of colliding with the live `0.1.0` registry state.
  - Hardened `verifyCubidWebhookSignature` so non-finite or invalid `toleranceSeconds`, `now`, and timestamp inputs fail closed with validation errors.
  - Updated `CubidWebhookEvent<TData>` and `parseCubidWebhookEvent` so missing webhook `data` is modeled honestly as `null` instead of violating the exported type contract.
  - Added test coverage for the stricter webhook validation edge cases and nullable parsed webhook data.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

## session: s30-siwc-wallet-event-and-capability-roadmap-ingest

- Timestamp: 2026-05-06T15:35:00Z
- Summary: Ingested the SIWC wallet webhook and smart-account roadmap notes so future SDK work stays additive on webhooks and capability-driven on custody features.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-06-siwc06-wallet-webhook-contracts.md`.
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-06-siwc07-smart-account-roadmap.md`.
  - Added a webhook follow-up so public webhook types and examples can pick up the new SIWC wallet event names without changing the existing verification contract.
  - Recorded that transaction webhook names remain deferred because transaction signing is still disabled.
  - Added a future chain-account planning item that keeps smart accounts, session keys, paymasters, and gas sponsorship capability-driven rather than universally assumed.
  - Updated package-boundary docs so future agents keep wallet-event handling additive in `@cubid/core` and avoid implying that smart-account features are default or globally available.
- Validation:
  - Reviewed the updated roadmap and target-state guidance against the two incoming Passport notes.

## session: s29-s08-signing-request-roadmap-ingest

- Timestamp: 2026-05-06T15:10:00Z
- Summary: Ingested the first Sign In With Cubid signing-request lifecycle notes into the public SDK roadmap and package-boundary docs without starting runtime wrappers early.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-06-siwc04-signing-request-lifecycle.md`.
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-06-siwc05-transaction-risk-controls.md`.
  - Added a new `S08` roadmap track for typed API v3 signing-request lifecycle wrappers in `@cubid/core`.
  - Recorded the planned public wrapper names `createSigningRequest`, `getSigningRequest`, `listSigningRequests`, and `cancelSigningRequest`.
  - Captured the redacted response metadata expectations, SIWC05 additive risk fields, the no-approval-from-dapp-keys rule, and the continued fail-closed posture for transaction signing.
  - Updated package-boundary docs so future agents keep hosted approval and rejection UX in Passport while placing dapp-facing HTTP wrappers in `@cubid/core`.
  - Recorded that the adjacent incoming notes `siwc06` and `siwc07` should be handled before starting the runtime `S08` implementation.
- Validation:
  - Reviewed the updated roadmap and package-boundary docs for consistency with the two incoming Passport notes.

## session: s28-s05-app-scoped-stamp-surface

- Timestamp: 2026-05-03T22:40:00Z
- Summary: Finished the current S05 tranche by exporting the canonical stamp registry and a small app-scoped subject helper from `@cubid/core`.
- Actions:
  - Added `CUBID_STAMP_TYPE_IDS`, `getCubidStampTypeId`, `getCubidStampTypeName`, `getCubidStampTypeNamesById`, and `summarizeCubidDisclosedStamp` to align public SDK stamp metadata with Passport's canonical stamp registry.
  - Added `createCubidAppScopedSubject` so downstream apps can validate and wrap app-scoped `userId` values without introducing raw cross-app identifiers.
  - Updated stamp normalization so `fetchStamps` falls back to canonical stamp names when the backend returns only a numeric `stamptype`.
  - Expanded public docs so the app-scoped subject model and canonical stamp helpers are part of the supported `@cubid/core` surface.
  - Closed the current S05 roadmap tranche while keeping future `notGranted` expansion explicitly gated on stronger backend route signals.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm typecheck`
  - `pnpm build`

## session: s27-package-metadata-republish

- Timestamp: 2026-05-03T22:15:00Z
- Summary: Corrected the published npm metadata for the first non-core public packages and verified the new dependency ranges live on the registry.
- Actions:
  - Bumped `@cubid/browser`, `@cubid/react`, `@cubid/evm`, and `@cubid/wagmi` to `0.1.1` as metadata-only patch releases.
  - Verified packed manifests locally before release so internal workspace dependencies rewrote to real published versions.
  - Fixed the GitHub Actions webhook-helper typecheck issue that had blocked the first trusted-publishing retry.
  - Added npm trusted-publisher bindings for `@cubid/browser`, `@cubid/react`, `@cubid/evm`, and `@cubid/wagmi`.
  - Published and verified live corrective versions:
    - `@cubid/browser@0.1.1`
    - `@cubid/react@0.1.1`
    - `@cubid/evm@0.1.1`
    - `@cubid/wagmi@0.1.1`
- Validation:
  - `pnpm --filter @cubid/browser pack --pack-destination /tmp/cubid-browser-pack`
  - `pnpm --filter @cubid/react pack --pack-destination /tmp/cubid-react-pack`
  - `pnpm --filter @cubid/evm pack --pack-destination /tmp/cubid-evm-pack`
  - `pnpm --filter @cubid/wagmi pack --pack-destination /tmp/cubid-wagmi-pack`
  - `npm view @cubid/browser version dependencies --json`
  - `npm view @cubid/react version dependencies --json`
  - `npm view @cubid/evm version dependencies --json`
  - `npm view @cubid/wagmi version dependencies --json`

## session: s26-s07-webhook-helpers

- Timestamp: 2026-05-03T23:05:00Z
- Summary: Added runtime-agnostic v3 webhook verification helpers and receiver docs to `@cubid/core`.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-e02-7-api-v3-webhooks.md`.
  - Added `verifyCubidWebhookSignature` and `parseCubidWebhookEvent` as public `@cubid/core` exports rather than burying webhook verification inside the API client.
  - Implemented v1 HMAC verification over the exact `eventId.timestamp.rawBody` input using Web Crypto only.
  - Preserved canonical `eventType` and transition-friendly `legacyEventType` in normalized webhook event types.
  - Added receiver-oriented docs showing raw-body verification before JSON parsing and replay-protection guidance around timestamp plus `eventId`.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm --filter @cubid/core typecheck`
  - `pnpm --filter @cubid/core build`

## session: s25-s06-v3-idempotent-write-helpers

- Timestamp: 2026-05-03T22:45:00Z
- Summary: Added the first public API v3 write helpers to `@cubid/core` with idempotency support and Sui-aware custody types.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-e02-6-api-v3-idempotency.md`.
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-c05-1-1-dapp-user-secret-v2-quarantine.md`.
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-c05-2-1-sui-v3-custody.md`.
  - Added `saveSecret`, `generateAccount`, and `listAccounts` to `@cubid/core` with app-scoped `userId` inputs, internal v3 wire-key translation, and structured response types.
  - Added optional caller-owned idempotency keys plus secure auto-generation for the two write helpers that require `Idempotency-Key`.
  - Preserved backend `idempotency_conflict` and `request_in_progress` semantics through `CubidApiError.code` and a dedicated `conflict` error category.
  - Added custody-account normalization, including lowercase Sui public addresses and a public-metadata-only response surface.
  - Clarified in public docs that legacy v2 secret writes are removed and that the public SDK still does not expose a secret read or decrypt helper.
  - Updated the core README, integration guide, package contract doc, and roadmap to describe the new v3 helper surface.
- Validation:
  - `pnpm --filter @cubid/core test`
  - `pnpm --filter @cubid/core typecheck`

## session: s24-s05-disclosure-roadmap-followup

- Timestamp: 2026-05-03T22:20:00Z
- Summary: Turned the disclosure-helper follow-up into concrete roadmap subitems so future runtime states only land where Passport payloads actually prove privacy state.
- Actions:
  - Split roadmap task `S05` into completed, in-progress, and future-ready subitems instead of leaving the disclosure work as one broad bucket.
  - Recorded that profile and location helpers already meet the evidence threshold for typed `notGranted` states.
  - Documented the exact backend-signal requirements the SDK should demand before adding typed disclosure states to identity, stamp, or score helpers.
- Validation:
  - Reviewed the updated `agent-context/todo.md` entries for consistency with the current `@cubid/core` disclosure surface and existing Passport inbox notes.

## session: s23-chaincrew-workspace-dependency-followup

- Timestamp: 2026-05-03T22:10:00Z
- Summary: Ingested the ChainCrew note about broken workspace dependency metadata in the first published non-core npm packages and recorded the corrective release scope.
- Actions:
  - Reviewed `agent-context/messages-from-chaincrew/2026-05-03-published-package-workspace-dependency-note.md`.
  - Verified live npm metadata still exposes `workspace:*` dependency ranges for `@cubid/browser@0.1.0`, `@cubid/react@0.1.0`, `@cubid/evm@0.1.0`, and `@cubid/wagmi@0.1.0`.
  - Updated the SDK roadmap so corrective patch releases for the affected browser, React, EVM, and wagmi packages are tracked explicitly instead of being implied by the repo-side publish fix.
  - Updated the public publishing runbook to distinguish the repaired `pnpm publish` workflow from the already-published `0.1.0` metadata debt.
  - Prepared an outbound reply for ChainCrew confirming the issue, the repo-side fix, and the need for corrected package versions before downstream overrides can be removed.
- Validation:
  - `npm view @cubid/browser@0.1.0 dependencies --json`
  - `npm view @cubid/react@0.1.0 dependencies --json`
  - `npm view @cubid/evm@0.1.0 dependencies --json`
  - `npm view @cubid/wagmi@0.1.0 dependencies --json`

## session: s22-pr4-codex-review-followup

- Timestamp: 2026-05-03T21:12:00Z
- Summary: Addressed the Codex review note on PR #4 by fixing the npm publish path for workspace packages.
- Actions:
  - Updated `.github/workflows/publish.yml` so non-core package validation uses `pnpm pack` and npm publication uses `pnpm publish --provenance --no-git-checks`.
  - Updated the core publishing runbook so the documented bootstrap and workspace-package release guidance matches the pnpm-based publish path.
  - Verified locally that `pnpm pack` for `@cubid/browser` rewrites the internal `@cubid/core` dependency from `workspace:*` to `0.1.0` in the packed manifest.
- Validation:
  - `pnpm lint`
  - `pnpm --filter @cubid/browser pack --pack-destination /tmp/cubid-pack-check`
  - `tar -xOf /tmp/cubid-pack-check/cubid-browser-0.1.0.tgz package/package.json`

## session: s21-pr4-copilot-review-followup

- Timestamp: 2026-05-03T20:55:00Z
- Summary: Addressed the first Copilot review round on PR #4 with runtime-safe fixes for the wagmi hook and exact-location disclosure metadata.
- Actions:
  - Preserved the real wagmi connector instances when wiring `useCubidWagmiAdapter` so connect flows still receive the connector objects returned by `useConnectors()`.
  - Added hook coverage proving the adapter passes the raw connector object through to wagmi while still exposing simplified connector metadata to UI consumers.
  - Tightened exact-location disclosure detection so `place: null` no longer marks the response as available when no exact-location data is actually present.
  - Added a focused core test for the `place: null` exact-location edge case before replying on the Copilot threads.
- Validation:
  - `pnpm test`
  - `pnpm typecheck`
  - `pnpm lint`

## session: s20-disclosure-grant-only-followup

- Timestamp: 2026-05-03T10:25:00Z
- Summary: Ingested the Passport note that retired the legacy disclosure fallback and aligned the public SDK guidance with grant-only runtime semantics.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-e01-1-disclosure-fallback-retired.md`.
  - Updated the public `@cubid/core` README and integration docs so app-facing identity, stamp, score, and location release are described as grant-backed only, with legacy permission rows treated as migration input.
  - Clarified that the SDK should only expose typed `notGranted` states where backend payloads reliably distinguish privacy-limited success from genuinely empty data.
  - Moved roadmap task `S05` to in progress and anchored it to the new grant-only runtime truth.
- Validation:
  - Reviewed the updated docs and roadmap entries after the edits.

## session: s19-v3-contract-inbox-followup

- Timestamp: 2026-05-03T10:00:00Z
- Summary: Ingested the new Passport API v3 idempotency and webhook contract notes as SDK follow-up guidance rather than speculative runtime code.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-e02-6-api-v3-idempotency.md`.
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-03-e02-7-api-v3-webhooks.md`.
  - Updated the SDK package-target guidance so future v3 write helpers treat idempotency as a first-class public contract.
  - Added roadmap entries for future API v3 idempotent write helpers and webhook verification or docs follow-up.
  - Prepared an outbound reply for ChainCrew pointing them at the newly published Cubid package names and migration path.
- Validation:
  - Reviewed the updated target-state guidance, roadmap entries, and outbound ChainCrew reply after the edits.

## session: s18-evm-wagmi-publish

- Timestamp: 2026-05-03T09:47:00Z
- Summary: Published `@cubid/evm@0.1.0` and `@cubid/wagmi@0.1.0` to npm.
- Actions:
  - Published `@cubid/evm@0.1.0` through npm's browser approval flow using the normal Chrome session for on-device passkey support.
  - Published `@cubid/wagmi@0.1.0` after the refreshed npm login and without any additional code changes.
  - Confirmed with authenticated npm access checks that `@cubid/evm` and `@cubid/wagmi` are both public and read-write under the `cubid` org.
- Validation:
  - Observed successful npm publish completion messages for both packages.
  - Confirmed `npm access list packages cubid --json` includes `@cubid/evm` and `@cubid/wagmi`.
  - Confirmed `npm access get status @cubid/evm` and `npm access get status @cubid/wagmi` return `public`.

## session: s17-browser-react-publish

- Timestamp: 2026-05-03T00:45:00Z
- Summary: Published `@cubid/browser@0.1.0` and `@cubid/react@0.1.0` to npm.
- Actions:
  - Published `@cubid/browser@0.1.0` through npm's browser approval flow using the normal Chrome session for on-device passkey support.
  - Published `@cubid/react@0.1.0` through the same npm browser approval flow.
  - Confirmed with authenticated npm access checks that `@cubid/browser` and `@cubid/react` are both public and read-write under the `cubid` org.
  - Removed the temporary `.playwright-mcp/` browser artifact directory after the publish flow.
- Validation:
  - Observed successful npm publish completion messages for both packages.
  - Confirmed `npm access list packages cubid --json` includes `@cubid/browser` and `@cubid/react`.
  - Confirmed `npm access get status @cubid/browser` and `npm access get status @cubid/react` both return `public`.

## session: s16-wagmi-package-slice

- Timestamp: 2026-05-02T00:42:00Z
- Summary: Created the first `@cubid/wagmi` package slice on top of `@cubid/evm`.
- Actions:
  - Added `packages/wagmi` with `createCubidWagmiAdapter` and `useCubidWagmiAdapter`.
  - Kept wagmi-specific React and signing dependencies isolated behind the new package boundary.
  - Added package-level tests for the pure adapter builder and the hook-backed adapter surface.
  - Updated the workspace aliases, test config, and publish workflow so the new package is part of the public SDK release graph.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the wagmi package changes.

## session: s15-browser-react-release-prep

- Timestamp: 2026-05-02T00:42:00Z
- Summary: Prepared `@cubid/browser` and `@cubid/react` for publication and made the interim names explicitly compatibility-only.
- Actions:
  - Added package-level README, license, repository metadata, and publish-file lists for the browser, React, EVM, wagmi, and interim compatibility packages.
  - Updated `@cubid/web2` and `@cubid/web2-react` metadata and README copy so they clearly direct new integrations toward `@cubid/browser` and `@cubid/react`.
  - Generalized the publish workflow so maintainers can select a workspace package instead of only publishing `@cubid/core`.
  - Updated repo guidance to reflect that `@cubid/wagmi` now exists alongside the earlier browser, React, and EVM slices.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the release-prep changes.

## session: s14-core-jsr-live-publish-success

- Timestamp: 2026-05-02T00:23:00Z
- Summary: Published `@cubid/core@0.1.0` live to JSR through the existing GitHub Actions workflow.
- Actions:
  - Confirmed JSR package setup now linked `@cubid/core` to `Cubid-Me/cubid-sdk`.
  - Triggered the `Publish Packages` workflow from `main` with `publish_npm=false` and `publish_jsr=true`.
  - Observed GitHub Actions run `25265529712`, which completed successfully and published `@cubid/core` to JSR.
  - Verified `https://jsr.io/@cubid/core/meta.json` now returns live package metadata for version `0.1.0`.
  - Updated the public SDK docs and publishing runbook to reflect that JSR publication is now live.
- Validation:
  - Confirmed the successful GitHub Actions run and the live JSR package metadata response after publication.

## session: s13-evm-package-slice

- Timestamp: 2026-05-01T09:50:00Z
- Summary: Created the first real chain-specific package slice as `@cubid/evm`.
- Actions:
  - Copied the current `@cubid/web3` implementation into `packages/evm`.
  - Renamed the public wallet contracts and factory names to EVM-specific equivalents such as `createCubidEvmClient`.
  - Added package-level tests confirming the new package does not pull in browser, React, or wagmi dependency edges.
  - Kept `@cubid/web3` in place so later chain splits can decide the compatibility strategy deliberately.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the new package was added.

## session: s12-browser-react-package-slices

- Timestamp: 2026-05-01T09:42:00Z
- Summary: Created real `@cubid/browser` and `@cubid/react` package slices and converted the old names into compatibility wrappers.
- Actions:
  - Copied the current `@cubid/web2` surface into `packages/browser`.
  - Copied the current `@cubid/web2-react` surface into `packages/react`.
  - Switched the React package imports to depend on `@cubid/browser`.
  - Converted `@cubid/web2` and `@cubid/web2-react` into thin re-export compatibility packages.
  - Updated workspace path aliases, Vitest aliases, and repo docs to reflect the new primary package names.
- Validation:
  - Ran the workspace test, typecheck, and build flows after the package-slice changes.

## session: s11-core-jsr-live-publish-attempt

- Timestamp: 2026-05-01T09:25:00Z
- Summary: Attempted the first live JSR publish for `@cubid/core` and confirmed the remaining blocker is JSR-side authorization.
- Actions:
  - Triggered the `Publish Packages` workflow from `main` with `publish_npm=false` and `publish_jsr=true`.
  - Observed GitHub Actions run `25208963795`.
  - Confirmed the JSR publish step failed with `actorNotAuthorized`, indicating the package/repository binding is not yet authorized on the JSR side.
  - Updated the release roadmap and publishing runbook to record the exact blocker and keep the remaining work scoped to JSR owner setup.
- Validation:
  - Reviewed the failed workflow logs and confirmed the repo-side validation phase still passed before the JSR publish step failed.

## session: s10-app-disclosure-revocation-inbox

- Timestamp: 2026-05-01T09:15:00Z
- Summary: Ingested the Passport note about non-OIDC Allow Page grant history and revocation, and kept those routes out of the public core surface for now.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-01-e01-app-disclosure-revocation.md`.
  - Updated the SDK target-state guidance so user-authenticated disclosure-grant list/revoke routes are treated as future account-management or auth-surface APIs, not as dapp server APIs for `@cubid/core`.
  - Expanded the roadmap to note that revocation is now authoritative because Passport also clears matching legacy stamp permission rows.
- Validation:
  - Reviewed the updated target-state and roadmap notes after the edits.

## session: s09-profile-location-disclosure-taxonomy-inbox

- Timestamp: 2026-05-01T09:05:00Z
- Summary: Ingested the Passport profile/location disclosure taxonomy note and added typed disclosure metadata for those SDK response surfaces.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-01-e01-profile-location-disclosure-taxonomy.md`.
  - Added typed disclosure claim and granularity names to `@cubid/core` response models for profile and location helpers.
  - Updated the public SDK docs to explain the new claim names and to treat null/missing profile or location fields as potential `notGranted` outcomes.
  - Expanded the disclosure-helper roadmap so future SDK work preserves the new profile/location claim taxonomy.
- Validation:
  - Ran package-level core tests and typecheck after the type and documentation updates.

## session: s08-package-migration-planning

- Timestamp: 2026-05-01T08:52:00Z
- Summary: Wrote concrete staged migration plans for the browser, React, and chain package transitions.
- Actions:
  - Reviewed the current `web2`, `web2-react`, and `web3` public surfaces to map what must be preserved during renames and splits.
  - Added `docs/engineering/package-migration-plan.md` with phased execution plans for `@cubid/web2` -> `@cubid/browser`, `@cubid/web2-react` -> `@cubid/react`, and `@cubid/web3` -> chain packages.
  - Updated `docs/engineering/sdk-package-target-state.md` to reflect the hybrid package architecture instead of the older direct-to-React target shape.
  - Updated the repo roadmap so the browser/React rename work and chain split work are now explicitly tracked as in-progress planning efforts with completed planning subitems.
- Validation:
  - Reviewed current package entrypoints and tests before writing the migration plans.

## session: s07-core-cross-registry-verification

- Timestamp: 2026-05-01T08:32:00Z
- Summary: Verified the current cross-registry release status for `@cubid/core` and corrected docs that overstated live JSR availability.
- Actions:
  - Confirmed npm shows `@cubid/core@0.1.0` as the live `latest` release.
  - Confirmed `pnpm --filter @cubid/core pack:dry-run` and `pnpm --filter @cubid/core jsr:dry-run` still succeed locally.
  - Confirmed `https://jsr.io/@cubid/core/meta.json` currently returns 404, so the JSR package is not live yet.
  - Updated public docs and the publishing runbook to say `npm:@cubid/core` is the current Deno fallback until JSR is linked and published.
  - Split the roadmap so release verification is completed and the remaining owner-side JSR publication work is tracked separately.
- Validation:
  - Reviewed npm output, JSR dry-run output, and the updated release docs after the edits.

## session: s06-passport-runtime-disclosure-filtering-inbox

- Timestamp: 2026-05-01T08:15:00Z
- Summary: Ingested the Passport inbox note about runtime disclosure filtering and clarified that privacy-limited stamp and score results are valid success states.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-filtering-runtime.md`.
  - Updated the public `@cubid/core` package docs and the Next/Supabase integration guide to treat missing stamps, redacted helper fields, and lower/zero scores as possible disclosure-limited outcomes rather than automatic failures.
  - Expanded the future disclosure-helper roadmap to include explicit normalized privacy states such as `notGranted`.
- Validation:
  - Reviewed the affected SDK docs and roadmap entries after the edits.

## session: s05-core-bootstrap-publish

- Timestamp: 2026-05-01T00:06:00Z
- Summary: Bootstrap-published `@cubid/core@0.1.0` to npm and configured GitHub trusted publishing for future releases.
- Actions:
  - Ran the final package validation flow for `@cubid/core` from `main`.
  - Published `@cubid/core@0.1.0` to npm under the `cubid` scope.
  - Bound npm trusted publishing to `Cubid-Me/cubid-sdk` and `.github/workflows/publish.yml`.
  - Confirmed the public npm package page and `latest` dist-tag for `@cubid/core`.
- Validation:
  - Confirmed `@cubid/core` resolved publicly from npm at version `0.1.0`.
  - Confirmed npm trusted publishing was attached to the repo workflow.

## session: s04-hybrid-package-direction

- Timestamp: 2026-05-01T00:15:00Z
- Summary: Rewrote the agent backgrounder and nearby repo guidance to align on a hybrid public SDK package model.
- Actions:
  - Added `agent-context/backgrounder-for-agents.md` describing the public/private Cubid split and the target public package ecosystem.
  - Updated `AGENTS.md` so the repo rules now explicitly preserve a first-class headless browser layer, a future React rename, chain package splits, and dedicated auth package boundaries.
  - Updated `README.md` to describe both the current interim package names and the intended long-term names.
  - Updated `agent-context/todo.md` so the roadmap now tracks browser-layer renaming, React renaming, chain-package splits, dedicated auth packages, and disclosure-aligned identity helpers separately.
- Validation:
  - Reviewed the current package manifests and entrypoints before updating the background guidance.

## session: s03-passport-disclosure-grant-inbox

- Timestamp: 2026-04-30T23:55:00Z
- Summary: Ingested the Passport inbox note about persisted selective-disclosure grants and tightened SDK docs/todo language around app-scoped identifiers.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-04-30-e01-disclosure-grant-persistence.md`.
  - Updated the public integration guide to prefer app-scoped `userId` or OIDC pairwise `sub` over raw/internal identifiers.
  - Documented that returned identity/stamp data may be filtered by persisted selective-disclosure grants from `allow_page` and `oidc`, not only by legacy permission rows.
  - Expanded the SDK todo follow-up to reference the new disclosure-grant persistence message directly.
- Validation:
  - Reviewed the current SDK docs and todo state after the edits.

## session: s02-repo-boundary-agents-note

- Timestamp: 2026-04-30T23:40:10Z
- Summary: Recorded the `AGENTS.md` repo-boundary guidance update that landed in commit `8ed25ab1`.
- Actions:
  - Confirmed `AGENTS.md` now identifies `Cubid-Me/cubid-sdk` as the canonical public SDK home.
  - Confirmed the guidance keeps private Passport/Admin/OIDC runtime code in `cubid-passport`.
  - Confirmed cross-repo coordination folders are documented for SDK-to-Passport and Passport-to-SDK messages.
- Validation:
  - Reviewed the committed `AGENTS.md` contents and current repository status.
- Follow-up:
  - Future SDK-impacting backend changes from `cubid-passport` should continue to arrive through `agent-context/messages-from-cubid-passport/`.

## session: s01-core-adoption

- Timestamp: 2026-04-30T14:10:00Z
- Summary: Adopted `@cubid/core` into `cubid-sdk-v2` as the canonical public foundation package.
- Actions:
  - Replaced `packages/api` with the stronger `packages/core` implementation imported from `cubid-passport/packages/core`.
  - Updated workspace references so `@cubid/web2` and `@cubid/web3` depend on `@cubid/core`.
  - Ported package-local Apache-2.0 licensing, npm/JSR metadata, Deno smoke validation, and publish workflow scaffolding into the SDK repo.
  - Added SDK-local `AGENTS.md`, `agent-context/todo.md`, and this `session-log.md`.
  - Updated `cubid-passport` docs and E02 todos to mark SDK publication work as ingested into `cubid-sdk-v2`.
- Repo hygiene note: `/Users/botmaster/src/cubid/cubid-sdk-v2` is missing a `.git` checkout locally, so branch/head metadata and commit provenance were unavailable during this session.

## session: s04-auth-pr9-ci-followup

- Timestamp: 2026-05-13T20:35:00Z
- Summary: Fixed PR #9 CI so the shared unit-test pass works on a clean runner after adding the new auth packages.
- Actions:
  - Inspected the failed `validate` run for PR #9 and isolated the break to `packages/auth-react/src/index.test.tsx` failing to resolve `@cubid/auth`.
  - Updated the root `test:unit` script to build `@cubid/auth` before running the shared Vitest suite, alongside the existing minimal package prebuilds.
  - Updated the testing strategy doc so the clean-runner requirement now explicitly covers auth package consumers as well as React and wagmi suites.
- Validation:
  - Reproduced the relevant check locally with `pnpm test:unit`.

## session: s04-auth-pr9-api-reference-followup

- Timestamp: 2026-05-13T21:20:00Z
- Summary: Refreshed the checked-in API reference artifact for `@cubid/auth-react` after PR #9 exposed a docs-reference drift in CI.
- Actions:
  - Inspected the failed PR #9 `validate` rerun and isolated the remaining break to `pnpm docs:api:check`.
  - Regenerated the machine-readable API reference artifacts and confirmed the only drift was `docs/reference/api/auth-react.json`.
  - Kept the refreshed artifact so the generated `@cubid/auth-react` reference now matches the new ClearPass example link in the package docs.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`

## session: s04-auth-pr9-review-followup

- Timestamp: 2026-05-13T23:25:00Z
- Summary: Addressed the open PR #9 review threads around React 18 compatibility, callback replay safety, stricter OIDC validation, and auth docs hygiene.
- Actions:
  - Replaced the React 19-only `useEffectEvent` usage in `CubidAuthCallback` with a React 18-compatible ref-based pattern.
  - Added a per-request guard so the callback component only performs one code exchange for the same callback input under `React.StrictMode`.
  - Tightened callback validation to require the expected ID token and matching nonce for `openid` flows.
  - Hardened `decodeCubidIdTokenClaims` to require exactly three JWT segments and added a `Buffer` fallback for base64url helpers when `atob` or `btoa` are unavailable.
  - Removed the duplicated `@cubid/auth-react` target-state bullet and expanded auth/auth-react tests to cover the new behavior.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`

## session: s51-near-package-slice

- Timestamp: 2026-05-14T04:10:00Z
- Summary: Continued `S03` by extracting `@cubid/near` as the next real chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/near` with NEAR-specific client, types, capability helpers, tests, package metadata, and README.
  - Kept `accountId` as the primary public identity for default NEAR stamp serialization while preserving optional `address`, `networkId`, and `chainType` metadata.
  - Wired the new package into path aliases, Vitest coverage and unit suites, the publish workflow, the package matrix, the API reference generator, and the chain-split roadmap docs.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`

## session: s52-solana-package-slice

- Timestamp: 2026-05-14T04:50:00Z
- Summary: Continued `S03` again by extracting `@cubid/solana` as the next real chain-specific package on top of `@cubid/core`.
- Actions:
  - Added `packages/solana` with Solana-specific client, types, capability helpers, tests, package metadata, and README.
  - Kept `publicKey` as the primary public identity for default Solana stamp serialization while preserving optional `address`, `cluster`, and `chainType` metadata.
  - Wired the new package into path aliases, Vitest coverage and unit suites, the publish workflow, the package matrix, the API reference generator, and the chain-split roadmap docs.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`

## session: s53-siwc-wallet-handoff-ingest

- Timestamp: 2026-05-14T05:20:00Z
- Summary: Ingested the new Passport SIWC wallet handoff notes and opened a dedicated SDK track for capability discovery, passkey-approved account requests, browser-safe approval helpers, and typed SIWC result/error handling.
- Actions:
  - Reviewed `agent-context/messages-from-cubid-passport/2026-05-14-siwc09-passkey-account-creation.md`, `2026-05-14-siwc10-wallet-capabilities.md`, `2026-05-14-siwc12-evm-transaction-pilot.md`, `2026-05-14-siwc13-solana-transaction-readiness.md`, and `2026-05-14-siwc14-sdk-wallet-release-handoff.md`.
  - Added `S12` and its implementation subitems to `agent-context/todo.md` so the account-request lifecycle, capability discovery, hosted approval helpers, typed SIWC errors, and transaction pilot guardrails are tracked as one coherent release surface.
  - Updated package-boundary guidance so future agents keep runtime-agnostic request and capability wrappers in `@cubid/core`, keep user-approval helpers in `@cubid/browser`, and preserve the fail-closed stance for unsupported or policy-disabled transaction flows.
- Validation:
  - Reviewed the existing `@cubid/core` signing helpers, the current browser hosted-flow helpers, and the Passport API v3 contract docs before recording the new roadmap slice.

## session: s54-siwc-wallet-helper-release-surface

- Timestamp: 2026-05-14T08:40:00Z
- Summary: Implemented the public SIWC wallet helper release surface in `@cubid/core` and `@cubid/browser`, including capability discovery, passkey-approved account requests, typed SIWC errors, typed signing results, and hosted approval descriptors.
- Actions:
  - Added runtime-agnostic `@cubid/core` helpers for `accounts/capabilities`, `accounts/requests/create`, and `accounts/requests/get`, along with typed public capability, policy, chain-action, and account-request response models.
  - Added `CubidSiwcError`, `isCubidSiwcError`, typed signing-result guards, and typed normalization for signature and EVM pilot `signed_transaction` results while keeping Solana transaction signing fail-closed.
  - Added browser-safe SIWC hosted approval and rejection request descriptors in `@cubid/browser` for account and signing requests.
  - Updated the core and browser READMEs, the Next/Supabase integration guide, generated API reference artifacts, and package release metadata for `@cubid/core@0.1.3` and `@cubid/browser@0.1.3`.
- Validation:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm test:unit`
  - `pnpm build`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm check:core-package`

## session: s55-pr11-lockfile-ci-followup

- Timestamp: 2026-05-14T14:44:00Z
- Summary: Fixed the first PR #11 CI failure by refreshing the workspace lockfile for the new chain packages before rerunning the matching local gate.
- Actions:
  - Reproduced the failing `validate` check from GitHub Actions and confirmed the blocker was `ERR_PNPM_OUTDATED_LOCKFILE` rather than a runtime or test regression.
  - Refreshed `pnpm-lock.yaml` so the new `packages/near` and `packages/solana` workspace dependencies on `@cubid/core` are recorded in the committed lockfile.
- Validation:
  - `pnpm install --frozen-lockfile`
  - `pnpm test:unit`

## session: s56-local-install-instructions-frozen-lockfile

- Timestamp: 2026-05-14T15:00:00Z
- Summary: Updated local build and smoke instructions to use `pnpm install --frozen-lockfile` so developer validation matches CI and Vercel dependency behavior.
- Actions:
  - Updated the root README command guidance to recommend `pnpm install --frozen-lockfile` for local build, validation, and smoke-style package checks.
  - Updated the testing strategy and publishing runbook so local validation, acceptance, and release verification all start from the same frozen-lockfile install step used in automated environments.
- Validation:
  - Reviewed the updated docs against `.github/workflows/ci.yml` and `.github/workflows/publish.yml`, both of which already use `pnpm install --frozen-lockfile`.

## session: s57-pr11-api-reference-drift-followup

- Timestamp: 2026-05-14T15:12:00Z
- Summary: Fixed the next PR #11 CI failure by regenerating the drifted API reference artifact for `@cubid/core`.
- Actions:
  - Reproduced the failing `pnpm docs:api:check` gate from GitHub Actions and confirmed the only drifted file was `docs/reference/api/core.json`.
  - Regenerated the committed API reference artifact so the published `@cubid/core` helper docs now include the new typed signing-result guard references in the machine-readable output.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `git diff --check`

## session: s58-pre-yeet-validation-script

- Timestamp: 2026-05-14T15:25:00Z
- Summary: Added a single repo-level pre-yeet validation command so the full CI-like gate is easier to run locally before publishing a PR.
- Actions:
  - Added `pnpm validate:yeet` at the repo root to run the full release-handoff sequence: frozen-lockfile install, lint, typecheck, unit tests, build, acceptance tests, coverage, API-reference drift check, and core package dry-runs.
  - Updated the root README and testing strategy so human guidance now points to the single script first, while still documenting the expanded step-by-step sequence underneath it.
- Validation:
  - `pnpm validate:yeet`

## session: s59-pr11-review-followup

- Timestamp: 2026-05-14T17:55:00Z
- Summary: Addressed the open PR #11 Copilot and Codex review threads by hardening hosted SIWC descriptors, removing redundant verified-persistence guards, and documenting the numeric `policyVersion` contract explicitly.
- Actions:
  - Added runtime `decision` validation and `credentials: "include"` to the hosted SIWC browser descriptors, plus tests covering both the new descriptor shape and invalid decisions.
  - Removed the duplicated precondition guards from the NEAR and Solana clients so persistence context is only required when a verified result is actually being written, and added tests for the unverified path.
  - Updated the browser and core docs to call out the credentialed hosted SIWC fetch requirement and the now-explicit numeric `policyVersion` normalization contract, then regenerated the machine-readable API reference artifacts.
- Validation:
  - `pnpm validate:yeet`
