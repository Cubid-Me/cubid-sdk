#!/usr/bin/env node

import {
  checkCubidIdentityIssuerReadiness,
  CubidAuthError,
} from "../packages/auth/dist/index.mjs";

const parseArgs = (argv) => {
  const options = {
    environment: "production",
    issuer: undefined,
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--") {
      continue;
    }

    if (arg === "--json") {
      options.json = true;
      continue;
    }

    if (arg === "--environment" || arg === "--env") {
      options.environment = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--issuer") {
      options.issuer = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
};

const printHelp = () => {
  console.log(`Usage: pnpm auth:issuer:check [--environment production|staging] [--issuer URL] [--json]

Checks Cubid Identity issuer readiness using metadata-only OIDC discovery and
JWKS requests. Defaults to production and never falls back to staging.`);
};

const main = async () => {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const report = await checkCubidIdentityIssuerReadiness({
    environment: options.environment,
    issuer: options.issuer,
  });

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  console.log(
    [
      `Cubid Identity ${report.environment} issuer readiness passed.`,
      `issuer: ${report.issuer}`,
      `jwks_uri: ${report.jwksUri}`,
      `jwks_keys: ${report.jwksKeyCount}`,
      `authorization_code: ${report.supportsAuthorizationCode}`,
      `pkce_s256: ${report.supportsPkceS256}`,
      `pairwise_subjects: ${report.supportsPairwiseSubjects}`,
    ].join("\n")
  );
};

main().catch((error) => {
  if (error instanceof CubidAuthError) {
    console.error(
      [
        `Cubid Identity issuer readiness failed: ${error.message}`,
        `category: ${error.category}`,
        `code: ${error.code ?? "unknown"}`,
        `status: ${error.status ?? "n/a"}`,
      ].join("\n")
    );
    process.exit(1);
  }

  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
