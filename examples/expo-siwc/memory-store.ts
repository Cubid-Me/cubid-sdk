import { timingSafeEqual } from "node:crypto";
import type { AppSession, CompletionBinding, ReferenceStore, Transaction } from "./model";
import { ReferenceError } from "./model";

/** Development only: process-local, bounded, no durability or distributed atomicity. */
export class MemoryReferenceStore implements ReferenceStore {
  private transactions = new Map<string, Transaction>();
  private sessions = new Map<string, AppSession>();
  constructor(private readonly capacity = 128) {
    if (!Number.isSafeInteger(capacity) || capacity < 1 || capacity > 1024) throw new ReferenceError("invalid_request");
  }
  private prune(now: number) {
    for (const [key, value] of this.transactions) if (value.expiresAt <= now) this.transactions.delete(key);
    for (const [key, value] of this.sessions) if (value.expiresAt <= now) this.sessions.delete(key);
  }
  async putTransaction(value: Transaction, now: number) {
    this.prune(now);
    if (this.transactions.has(value.id) || this.transactions.size >= this.capacity) throw new ReferenceError("capacity");
    this.transactions.set(value.id, structuredClone(value));
  }
  async takeTransaction(id: string, binding: CompletionBinding, now: number) {
    this.prune(now);
    const value = this.transactions.get(id);
    if (!value || value.kind !== binding.kind || value.sessionKey !== binding.sessionKey ||
        value.issuer !== binding.issuer || value.clientId !== binding.clientId || value.redirectUri !== binding.redirectUri) return null;
    const expected = Buffer.from(value.deviceChallenge);
    const actual = Buffer.from(binding.deviceChallenge);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    // No await between match and removal. A shared production store needs an atomic operation.
    this.transactions.delete(id);
    return structuredClone(value);
  }
  async putSession(value: AppSession, now: number) {
    this.prune(now);
    if (this.sessions.has(value.key) || this.sessions.size >= this.capacity) throw new ReferenceError("capacity");
    this.sessions.set(value.key, structuredClone(value));
  }
  async getSession(key: string, now: number) {
    this.prune(now);
    const value = this.sessions.get(key);
    return value ? structuredClone(value) : null;
  }
  async deleteSession(key: string) { this.sessions.delete(key); }
}
