import { createContext, useContext } from "react";
import type { ReactNode } from "react";

import type { CubidWeb2Client } from "@cubid/web2";

export interface CubidWeb2ProviderProps {
  children: ReactNode;
  client: CubidWeb2Client;
}

const CubidWeb2Context = createContext<CubidWeb2Client | null>(null);

export function CubidWeb2Provider({ children, client }: CubidWeb2ProviderProps) {
  return <CubidWeb2Context.Provider value={client}>{children}</CubidWeb2Context.Provider>;
}

export function useCubidWeb2Client() {
  const client = useContext(CubidWeb2Context);

  if (!client) {
    throw new Error("A CubidWeb2Client was not found in context.");
  }

  return client;
}

export function useOptionalCubidWeb2Client() {
  return useContext(CubidWeb2Context);
}
