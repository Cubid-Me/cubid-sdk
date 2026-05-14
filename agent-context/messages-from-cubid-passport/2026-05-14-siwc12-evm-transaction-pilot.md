# Cubid Passport SIWC12: EVM Transaction Signing Pilot

Cubid Passport is adding the first API v3 transaction-signing pilot behind
Admin SIWC policy. This is backend-only work in `cubid-passport`; SDK agents
should ingest this note when adding wallet helpers or SmarTrust-facing browser
flows.

## Contract Changes

- `POST /api/v3/accounts/capabilities` may now report
  `walletActionsByChain.evm.transactionSigning = true` with
  `transactionSigningStatus = "evm_pilot_policy_enabled"` when the app policy
  enables EVM transaction requests.
- `POST /api/v3/signing/requests/create` can create `transaction` requests
  that enter `pending_user_approval` instead of `policy_denied`, but only for
  policy-approved EVM contract-call transactions.
- Passport approval still requires fresh passkey step-up before signing.
- Successful approval returns a completed signing request whose `result`
  contains `type: "signed_transaction"`, `algorithm: "evm_transaction"`,
  `chainId`, `publicAddress`, `signedTransaction`, and `transactionHash`.
- Cubid does not broadcast the transaction in SIWC12. The caller owns broadcast
  and follow-up transaction tracking.

## Pilot Limits

The transaction payload must be caller-prepared and include:

- `chainId` equal to Ethereum mainnet `1`, Base `8453`, or Arbitrum One `42161`.
- `to` as the contract address, present in the Admin SIWC contract allowlist.
- non-empty contract-call `data`.
- `declaredValueUsd` within the Admin policy value limit.
- `nonce`, `gasLimit`, and either `gasPrice` or EIP-1559 fee fields.
- zero native `value`; native-value transfers are not part of the pilot.

SDK UX should continue treating transaction signing as capability-gated and
policy-deniable. Do not present this as arbitrary EVM wallet signing.

## Error Handling

Use the SIWC11 browser-safe error taxonomy when present. Common SIWC12 denial
codes include:

- `transaction_evm_chain_id_missing`
- `transaction_evm_chain_id_not_pilot_enabled`
- `transaction_contract_call_required`
- `contract_not_allowlisted`
- `contract_allowlist_missing`
- `transaction_value_limit_exceeded`
- `transaction_value_usd_not_declared`

## Suggested SDK Follow-Up

Add typed helpers for:

- EVM transaction request creation with the required pilot fields.
- Capability checks before showing transaction-signing UI.
- Passport approval launcher reuse.
- Handling completed `signed_transaction` results without attempting browser
  private-key handling.
