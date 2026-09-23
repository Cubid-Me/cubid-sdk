import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { CubidWeb2Client } from "@cubid/browser";

import { CubidThemeProvider } from "./theme";
import type { CubidLook } from "./theme";

export interface CubidProviderProps extends CubidLook {
  children: ReactNode;
  /** A client from `createCubidWeb2Client` (`@cubid/browser`); it only needs `fetch`, which React Native has. */
  client: CubidWeb2Client;
}

const CubidContext = createContext<CubidWeb2Client | null>(null);

/** The client, and optionally the look (theme tokens, style slots, labels) for every Cubid component below. */
export function CubidProvider({ children, client, labels, styles, theme }: CubidProviderProps) {
  return (
    <CubidContext.Provider value={client}>
      <CubidThemeProvider labels={labels} styles={styles} theme={theme}>
        {children}
      </CubidThemeProvider>
    </CubidContext.Provider>
  );
}

export function useCubidClient() {
  const client = useContext(CubidContext);

  if (!client) {
    throw new Error("A CubidWeb2Client was not found in context. Wrap the tree in <CubidProvider client={…}>.");
  }

  return client;
}

export function useOptionalCubidClient() {
  return useContext(CubidContext);
}
