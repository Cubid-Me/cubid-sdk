import type { CubidReauthenticationTransaction } from "./sdk";

export interface AppSession {
  key: string; // SHA-256 of the opaque app credential; never a Cubid token
  issuer: string;
  clientId: string;
  subject: string;
  expiresAt: number;
}
interface TransactionBinding {
  id: string;
  issuer: string;
  clientId: string;
  redirectUri: string;
  deviceChallenge: string;
  expiresAt: number;
}
export type Transaction = TransactionBinding & (
  | { kind: "login"; sessionKey: null; nonce: string; codeVerifier: string; requestedAt: number }
  | { kind: "step_up"; sessionKey: string; reauthentication: CubidReauthenticationTransaction }
);
export interface CompletionBinding {
  issuer: string;
  clientId: string;
  redirectUri: string;
  kind: Transaction["kind"];
  sessionKey: string | null;
  deviceChallenge: string;
}
/** Server-only. Implementations must snapshot values and atomically match/remove transactions. */
export interface ReferenceStore {
  putTransaction(value: Transaction, now: number): Promise<void>;
  takeTransaction(id: string, binding: CompletionBinding, now: number): Promise<Transaction | null>;
  putSession(value: AppSession, now: number): Promise<void>;
  getSession(key: string, now: number): Promise<AppSession | null>;
  deleteSession(key: string): Promise<void>;
}
export class ReferenceError extends Error {
  constructor(readonly code: "invalid_request" | "invalid_transaction" | "unauthorized" | "authentication_failed" | "capacity") {
    super(code);
    this.name = "ReferenceError";
  }
}
