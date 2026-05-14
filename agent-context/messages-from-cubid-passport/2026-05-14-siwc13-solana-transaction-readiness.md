# Cubid Passport SIWC13: Solana Transaction Readiness

Cubid Passport added Solana transaction-readiness metadata without enabling
Solana transaction signing. SDK agents should use this for browser-safe wallet
UX, not as a signal that Solana transactions can be signed yet.

## Backend Behavior

- Solana message signing remains available where policy allows `message`.
- Solana `transaction` signing requests still fail closed with
  `errorCode = "transaction_chain_risk_unsupported"`.
- If the caller provides a payload with `instructions[]`, Passport records a
  readable instruction-batch summary:
  - `payloadSummary.chain = "solana"`
  - `payloadSummary.operation = "solana_instruction_batch"`
  - `payloadSummary.instructionCount`
  - `payloadSummary.programIds`
- Public response risk fields may include:
  - `transactionOperationType = "solana_instruction_batch"`
  - `transactionContractAddress` as the first summarized program id
  - `transactionRecipient` as the first summarized account
  - `riskReasons` including `solana_transaction_signing_not_enabled`

## SDK Guidance

- Keep Solana transaction signing UI disabled unless future capability discovery
  explicitly reports support.
- You may show the summarized program ids / instruction count as "coming soon"
  readiness evidence, but do not launch Passport approval expecting a signature.
- Continue using stable SIWC error metadata for unsupported transaction flows.

## Future Backend Gap

Solana transaction signing still needs supported transaction shapes,
simulation/dry-run strategy, human-readable risk summaries, policy enforcement,
passkey approval, and safe webhook/result fields before enablement.
