import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

const requireCheck = (condition, label) => {
  if (!condition) throw new Error(`Starter preflight failed: ${label}`);
};

function httpsUrl(value, label, originOnly = false) {
  let url;
  try { url = new URL(value); } catch { requireCheck(false, label); }
  requireCheck(url.protocol === "https:" && !url.username && !url.password &&
    !url.search && !url.hash && (!originOnly || url.pathname === "/"), label);
  return url;
}

// Explicit candidate configuration only: this cannot verify registration,
// deployment provenance, signed-in state, or physical-device acceptance.
export async function checkStarterDeviceReadiness({
  origin, issuer, clientId, scope = ["openid"], fetchImpl = fetch,
} = {}) {
  const app = httpsUrl(origin, "explicit HTTPS Starter origin", true);
  const identity = httpsUrl(issuer, "explicit HTTPS issuer");
  requireCheck(typeof clientId === "string" && clientId.trim() === clientId &&
    clientId.length > 0, "explicit public client identifier");
  requireCheck(Array.isArray(scope) && scope.includes("openid") &&
    scope.every((s) => typeof s === "string" && /^[\x21\x23-\x5B\x5D-\x7E]+$/u.test(s)) &&
    new Set(scope).size === scope.length, "explicit scope policy");
  const checks = [];
  const request = async (url) => {
    try {
      return await fetchImpl(url, {
        redirect: "manual", credentials: "omit", cache: "no-store",
        signal: AbortSignal.timeout(15_000), headers: { accept: "application/json" },
      });
    } catch { requireCheck(false, "request unavailable"); }
  };
  const json = async (response, label) => {
    requireCheck(response.status === 200, label);
    try { return await response.json(); } catch { requireCheck(false, label); }
  };
  const issuerId = identity.href.replace(/\/$/u, "");
  const discovery = await json(await request(`${issuerId}/.well-known/openid-configuration`),
    "discovery response");
  requireCheck(discovery?.issuer?.replace(/\/$/u, "") === issuerId, "discovery issuer");
  const authorization = httpsUrl(discovery.authorization_endpoint, "discovery authorization endpoint");
  checks.push("configured issuer matches discovery");

  const session = await json(await request(new URL("/api/cubid/siwc/session", app)), "session response");
  requireCheck(session?.authenticated === false && session.status === "not_signed_in" &&
    Array.isArray(session.trace), "unsigned web session");
  checks.push("unsigned web session");

  for (const [label, query, prompt, maxAge] of [
    ["normal", "", null, null],
    ["force login", "&prompt=login&max_age=0", "login", "0"],
    ["force consent", "&prompt=consent", "consent", null],
  ]) {
    const response = await request(new URL(`/api/cubid/siwc/start?return_to=%2F${query}`, app));
    requireCheck([302, 303, 307, 308].includes(response.status), `${label} redirect`);
    let target;
    try { target = new URL(response.headers.get("location")); }
    catch { requireCheck(false, `${label} location`); }
    requireCheck(target.origin === authorization.origin && target.pathname === authorization.pathname &&
      !target.username && !target.password && !target.hash, `${label} discovered endpoint`);
    const expected = {
      response_type: "code", client_id: clientId,
      redirect_uri: new URL("/api/cubid/siwc/callback", app).href,
      code_challenge_method: "S256", acr_values: "urn:cubid:acr:passkey", prompt, max_age: maxAge,
    };
    for (const [key, value] of Object.entries(expected)) {
      const values = target.searchParams.getAll(key);
      requireCheck(value === null ? values.length === 0 : values.length === 1 && values[0] === value,
        `${label} ${key}`);
    }
    for (const key of ["state", "nonce", "code_challenge"]) {
      requireCheck(target.searchParams.getAll(key).length === 1 &&
        /^[A-Za-z0-9_-]{32,}$/u.test(target.searchParams.get(key)), `${label} ${key} presence`);
    }
    requireCheck(target.searchParams.getAll("scope").length === 1 &&
      target.searchParams.get("scope").split(" ").sort().join(" ") === [...scope].sort().join(" "),
    `${label} scope policy`);
    requireCheck(!target.searchParams.has("cubid_provider") && !target.searchParams.has("login_hint"),
      `${label} unhinted passkey baseline`);
    const cookies = response.headers.getSetCookie();
    for (const name of ["cubid_siwc_txn", "cubid_siwc_return_to", "cubid_siwc_trace"]) {
      const matches = cookies.filter((cookie) => cookie.startsWith(`${name}=`));
      requireCheck(matches.length === 1, `${label} transaction cookie`);
      const attributes = matches[0].split(";").slice(1).map((v) => v.trim().toLowerCase());
      requireCheck(["httponly", "secure", "samesite=lax", "path=/"].every((v) => attributes.includes(v)),
        `${label} secure cookie attributes`);
    }
    checks.push(`${label} passkey launch`);
  }
  return { checks, authenticatedAcceptance: "pending operator device pass" };
}

async function main() {
  try {
    const { values } = parseArgs({ options: {
      origin: { type: "string" }, issuer: { type: "string" },
      "client-id": { type: "string" }, scope: { type: "string", default: "openid" },
    } });
    const result = await checkStarterDeviceReadiness({
      origin: values.origin, issuer: values.issuer, clientId: values["client-id"],
      scope: values.scope.split(" "),
    });
    console.log(JSON.stringify(result, null, 2));
  } catch {
    // Never serialize remote errors, URLs, response bodies or protocol material.
    console.error("Starter preflight failed; verify explicit configuration and the approved dev routes.");
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
