# Cubid Passport Handoff: SIWC09 Passkey-Approved Account Creation

Source repo: `Cubid-Me/cubid-passport`
Branch: `codex/siwc09-passkey-wallet-forward`
Date: 2026-05-14

## What Changed

Cubid Passport added backend API v3 support for user/passkey-approved
account-generation requests. This is the flow SmarTrust meant by "create a
wallet with passkey": the dapp creates a request, Passport shows the user the
app/chain/label intent, a fresh passkey-authenticated session approves it, and
only then Cubid creates the app-scoped custody account.

The older direct dapp route remains available:

- `POST /api/v3/accounts/generate`

New request lifecycle routes:

- `POST /api/v3/accounts/requests/create`
- `POST /api/v3/accounts/requests/get`
- `POST /api/siwc/accounts/requests/list`
- `POST /api/siwc/accounts/requests/approve`
- `POST /api/siwc/accounts/requests/reject`

## SDK Impact

Please add SDK helpers when this backend branch lands:

- create account request with `Idempotency-Key`
- poll account request status by `accountRequestId`
- launch hosted Passport approval for the user-side step
- expose stable statuses: `pending_user_approval`, `policy_denied`,
  `approved`, `rejected`, `expired`, and `failed`
- keep direct generate helpers available but steer passkey-wallet integrations
  toward the request lifecycle

## Safety Contract

SDK responses must never imply private-key access. The backend only returns
public metadata such as account request id, account id after approval, chain,
dapp user UUID, label, policy version, required ACR, status, public address,
and timestamps. It never returns private keys, ciphertext, wrapped keys, human
subject keys, raw Cubid user ids, or service-role fields.

## Notes For SmarTrust

The first supported SmarTrust path should use EVM and Solana account requests.
NEAR and Sui are supported by backend custody, but they are secondary for this
specific integration unless SmarTrust asks for them.
