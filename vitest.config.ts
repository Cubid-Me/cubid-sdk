import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@cubid/auth": path.resolve(__dirname, "packages/auth/src/index.ts"),
      "@cubid/auth-react": path.resolve(__dirname, "packages/auth-react/src/index.ts"),
      "@cubid/browser": path.resolve(__dirname, "packages/browser/src/index.ts"),
      "@cubid/bitcoin": path.resolve(__dirname, "packages/bitcoin/src/index.ts"),
      "@cubid/cardano": path.resolve(__dirname, "packages/cardano/src/index.ts"),
      "@cubid/core": path.resolve(__dirname, "packages/core/src/index.ts"),
      "@cubid/evm": path.resolve(__dirname, "packages/evm/src/index.ts"),
      "@cubid/near": path.resolve(__dirname, "packages/near/src/index.ts"),
      "@cubid/react": path.resolve(__dirname, "packages/react/src/index.ts"),
      "@cubid/solana": path.resolve(__dirname, "packages/solana/src/index.ts"),
      "@cubid/sui": path.resolve(__dirname, "packages/sui/src/index.ts"),
      "@cubid/wagmi": path.resolve(__dirname, "packages/wagmi/src/index.ts"),
      "@cubid/web2": path.resolve(__dirname, "packages/web2/src/index.ts"),
      "@cubid/web2-react": path.resolve(__dirname, "packages/web2-react/src/index.ts"),
      "@cubid/web3": path.resolve(__dirname, "packages/web3/src/index.ts")
    }
  },
  test: {
    coverage: {
      exclude: [
        "**/*.d.ts",
        "**/*.test.*",
        "packages/acceptance/**",
        "packages/web2/**",
        "packages/web2-react/**"
      ],
      include: [
        "packages/core/src/**/*.{ts,tsx}",
        "packages/auth/src/**/*.{ts,tsx}",
        "packages/auth-react/src/**/*.{ts,tsx}",
        "packages/browser/src/**/*.{ts,tsx}",
        "packages/bitcoin/src/**/*.{ts,tsx}",
        "packages/cardano/src/**/*.{ts,tsx}",
        "packages/react/src/**/*.{ts,tsx}",
        "packages/evm/src/**/*.{ts,tsx}",
        "packages/near/src/**/*.{ts,tsx}",
        "packages/solana/src/**/*.{ts,tsx}",
        "packages/sui/src/**/*.{ts,tsx}",
        "packages/wagmi/src/**/*.{ts,tsx}",
        "packages/web3/src/**/*.{ts,tsx}"
      ],
      provider: "v8",
      reporter: ["text", "lcov", "json-summary"],
      reportsDirectory: path.resolve(__dirname, "coverage")
    },
    projects: [
      {
        test: {
          environment: "node",
          include: [
            "packages/core/src/**/*.test.ts",
            "packages/auth/src/**/*.test.ts",
            "packages/browser/src/**/*.test.ts",
            "packages/bitcoin/src/**/*.test.ts",
            "packages/cardano/src/**/*.test.ts",
            "packages/evm/src/**/*.test.ts",
            "packages/near/src/**/*.test.ts",
            "packages/solana/src/**/*.test.ts",
            "packages/sui/src/**/*.test.ts",
            "packages/wagmi/src/**/*.test.ts",
            "packages/web3/src/**/*.test.ts"
          ],
          name: "node"
        }
      },
      {
        test: {
          environment: "jsdom",
          include: [
            "packages/auth-react/src/**/*.test.tsx",
            "packages/react/src/**/*.test.tsx",
            "packages/wagmi/src/**/*.test.tsx"
          ],
          name: "jsdom"
        }
      }
    ]
  }
});
