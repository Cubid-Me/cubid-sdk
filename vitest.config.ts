import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          environment: "node",
          include: ["packages/web2/src/**/*.test.ts", "packages/web3/src/**/*.test.ts"],
          name: "node"
        }
      },
      {
        test: {
          environment: "jsdom",
          include: ["packages/web2-react/src/**/*.test.tsx"],
          name: "jsdom"
        }
      }
    ]
  }
});
