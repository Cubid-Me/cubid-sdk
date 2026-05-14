import { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import process from "node:process"
import { spawnSync } from "node:child_process"
import { fileURLToPath } from "node:url"

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const referenceDir = join(repoRoot, "docs/reference/api")
const checkMode = process.argv.includes("--check")

const packages = [
  {
    slug: "core",
    name: "@cubid/core",
    dir: "packages/core",
    entryPoint: "packages/core/src/index.ts",
    tsconfig: "packages/core/tsconfig.json",
    registry: "npm + jsr",
  },
  {
    slug: "auth",
    name: "@cubid/auth",
    dir: "packages/auth",
    entryPoint: "packages/auth/src/index.ts",
    tsconfig: "packages/auth/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "auth-react",
    name: "@cubid/auth-react",
    dir: "packages/auth-react",
    entryPoint: "packages/auth-react/src/index.ts",
    tsconfig: "packages/auth-react/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "aptos",
    name: "@cubid/aptos",
    dir: "packages/aptos",
    entryPoint: "packages/aptos/src/index.ts",
    tsconfig: "packages/aptos/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "browser",
    name: "@cubid/browser",
    dir: "packages/browser",
    entryPoint: "packages/browser/src/index.ts",
    tsconfig: "packages/browser/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "bitcoin",
    name: "@cubid/bitcoin",
    dir: "packages/bitcoin",
    entryPoint: "packages/bitcoin/src/index.ts",
    tsconfig: "packages/bitcoin/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "cardano",
    name: "@cubid/cardano",
    dir: "packages/cardano",
    entryPoint: "packages/cardano/src/index.ts",
    tsconfig: "packages/cardano/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "cosmos",
    name: "@cubid/cosmos",
    dir: "packages/cosmos",
    entryPoint: "packages/cosmos/src/index.ts",
    tsconfig: "packages/cosmos/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "react",
    name: "@cubid/react",
    dir: "packages/react",
    entryPoint: "packages/react/src/index.ts",
    tsconfig: "packages/react/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "evm",
    name: "@cubid/evm",
    dir: "packages/evm",
    entryPoint: "packages/evm/src/index.ts",
    tsconfig: "packages/evm/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "near",
    name: "@cubid/near",
    dir: "packages/near",
    entryPoint: "packages/near/src/index.ts",
    tsconfig: "packages/near/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "polkadot",
    name: "@cubid/polkadot",
    dir: "packages/polkadot",
    entryPoint: "packages/polkadot/src/index.ts",
    tsconfig: "packages/polkadot/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "solana",
    name: "@cubid/solana",
    dir: "packages/solana",
    entryPoint: "packages/solana/src/index.ts",
    tsconfig: "packages/solana/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "starknet",
    name: "@cubid/starknet",
    dir: "packages/starknet",
    entryPoint: "packages/starknet/src/index.ts",
    tsconfig: "packages/starknet/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "sui",
    name: "@cubid/sui",
    dir: "packages/sui",
    entryPoint: "packages/sui/src/index.ts",
    tsconfig: "packages/sui/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "wagmi",
    name: "@cubid/wagmi",
    dir: "packages/wagmi",
    entryPoint: "packages/wagmi/src/index.ts",
    tsconfig: "packages/wagmi/tsconfig.json",
    registry: "npm-only",
  },
  {
    slug: "web3",
    name: "@cubid/web3",
    dir: "packages/web3",
    entryPoint: "packages/web3/src/index.ts",
    tsconfig: "packages/web3/tsconfig.json",
    registry: "npm-only",
  },
]

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: "pipe",
    ...options,
  })

  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim()
    throw new Error(output || `${command} ${args.join(" ")} failed`)
  }

  return result
}

function shouldDropNode(value) {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      value.flags &&
      typeof value.flags === "object" &&
      value.flags.isExternal &&
      value.flags.isInherited,
  )
}

function normalizeValue(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => !shouldDropNode(item)).map((item) => normalizeValue(item))
  }

  if (value && typeof value === "object") {
    const normalized = {}

    for (const [key, child] of Object.entries(value)) {
      if (
        key === "url" ||
        key === "id" ||
        key === "symbolIdMap" ||
        key === "files" ||
        key === "groups"
      ) {
        continue
      }

      if (key === "target" && typeof child === "number") {
        continue
      }

      if (key === "fileName" && typeof child === "string") {
        const marker = "/packages/"
        const markerIndex = child.lastIndexOf(marker)
        normalized[key] =
          markerIndex >= 0
            ? child.slice(markerIndex + 1)
            : relative(repoRoot, resolve(repoRoot, child)).replaceAll("\\", "/")
        continue
      }

      normalized[key] = normalizeValue(child)
    }

    return normalized
  }

  return value
}

function buildPackageReference(spec, tempRoot) {
  const packageJsonPath = join(repoRoot, spec.dir, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"))
  const tempTsconfigPath = join(tempRoot, `${spec.slug}.typedoc.tsconfig.json`)
  const rawOutputPath = join(tempRoot, `${spec.slug}.raw.json`)

  writeFileSync(
    tempTsconfigPath,
    `${JSON.stringify(
      {
        extends: join(repoRoot, spec.tsconfig),
        compilerOptions: {
          ignoreDeprecations: "5.0",
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  )

  run("pnpm", [
    "exec",
    "typedoc",
    "--json",
    rawOutputPath,
    "--entryPoints",
    join(repoRoot, spec.entryPoint),
    "--tsconfig",
    tempTsconfigPath,
    "--name",
    spec.name,
    "--disableGit",
    "--disableSources",
  ])

  const typedocJson = JSON.parse(readFileSync(rawOutputPath, "utf8"))
  const normalizedJson = normalizeValue(typedocJson)
  const finalJson = `${JSON.stringify(normalizedJson, null, 2)}\n`

  return {
    artifact: finalJson,
    manifestEntry: {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      registry: spec.registry,
      referencePath: `${spec.slug}.json`,
    },
  }
}

function main() {
  const tempRoot = mkdtempSync(join(tmpdir(), "cubid-api-reference-"))
  const generatedArtifacts = new Map()
  const manifestEntries = []

  try {
    for (const spec of packages) {
      const { artifact, manifestEntry } = buildPackageReference(spec, tempRoot)
      generatedArtifacts.set(`${spec.slug}.json`, artifact)
      manifestEntries.push(manifestEntry)
    }

    const manifest = `${JSON.stringify({ packages: manifestEntries }, null, 2)}\n`
    generatedArtifacts.set("manifest.json", manifest)

    if (checkMode) {
      const driftedFiles = []
      const expectedFiles = new Set(generatedArtifacts.keys())

      for (const [fileName, expectedContent] of generatedArtifacts.entries()) {
        const targetPath = join(referenceDir, fileName)
        const actualContent = existsSync(targetPath) ? readFileSync(targetPath, "utf8") : null

        if (actualContent !== expectedContent) {
          driftedFiles.push(relative(repoRoot, targetPath))
        }
      }

      if (existsSync(referenceDir)) {
        for (const fileName of readdirSync(referenceDir)) {
          if (!expectedFiles.has(fileName)) {
            driftedFiles.push(relative(repoRoot, join(referenceDir, fileName)))
          }
        }
      }

      if (driftedFiles.length > 0) {
        throw new Error(
          `API reference artifacts are out of date. Re-run pnpm docs:api:build.\n${driftedFiles
            .map((file) => `- ${file}`)
            .join("\n")}`,
        )
      }

      return
    }

    mkdirSync(referenceDir, { recursive: true })

    for (const [fileName, content] of generatedArtifacts.entries()) {
      writeFileSync(join(referenceDir, fileName), content, "utf8")
    }
  } finally {
    rmSync(tempRoot, { force: true, recursive: true })
  }
}

main()
