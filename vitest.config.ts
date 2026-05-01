import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@cubid/browser": path.resolve(__dirname, "packages/browser/src/index.ts"),
      "@cubid/core": path.resolve(__dirname, "packages/core/src/index.ts"),
      "@cubid/evm": path.resolve(__dirname, "packages/evm/src/index.ts"),
      "@cubid/react": path.resolve(__dirname, "packages/react/src/index.ts"),
      "@cubid/web2": path.resolve(__dirname, "packages/web2/src/index.ts"),
      "@cubid/web2-react": path.resolve(__dirname, "packages/web2-react/src/index.ts"),
      "@cubid/web3": path.resolve(__dirname, "packages/web3/src/index.ts")
    }
  },
  test: {
    projects: [
      {
        test: {
          environment: "node",
          include: [
            "packages/browser/src/**/*.test.ts",
            "packages/evm/src/**/*.test.ts",
            "packages/web3/src/**/*.test.ts"
          ],
          name: "node"
        }
      },
      {
        test: {
          environment: "jsdom",
          include: ["packages/react/src/**/*.test.tsx"],
          name: "jsdom"
        }
      }
    ]
  }
});
