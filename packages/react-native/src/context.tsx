import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { CubidWeb2Client } from "@cubid/browser";

export interface CubidProviderProps {
  children: ReactNode;
  /** A client from `createCubidWeb2Client` (`@cubid/browser`); it only needs `fetch`, which React Native has. */
  client: CubidWeb2Client;
}

const CubidContext = createContext<CubidWeb2Client | null>(null);

export function CubidProvider({ children, client }: CubidProviderProps) {
  return <CubidContext.Provider value={client}>{children}</CubidContext.Provider>;
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
