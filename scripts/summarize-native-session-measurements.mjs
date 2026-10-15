#!/usr/bin/env node
import { createReadStream } from "node:fs";
import { summarizeNativeSessionMeasurements } from "../examples/native-session-measurement.mts";

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--help") {
    console.log("Usage: node scripts/summarize-native-session-measurements.mjs <observations.json|->\nOffline, closed-schema observational report; no network, login or policy decision. Node 24+.");
    return;
  }
  if (args.length !== 1 || (args[0].startsWith("-") && args[0] !== "-")) throw new Error("Invalid arguments");
  const source = args[0] === "-" ? process.stdin : createReadStream(args[0]);
  const chunks = [];
  let size = 0;
  for await (const chunk of source) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += bytes.length;
    if (size > 1024 * 1024) throw new Error("Input too large");
    chunks.push(bytes);
  }
  const report = summarizeNativeSessionMeasurements(JSON.parse(Buffer.concat(chunks).toString("utf8")));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}
main().catch(() => {
  process.stderr.write("Invalid measurement input. No report written.\n");
  process.exitCode = 1;
});
