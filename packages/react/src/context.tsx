import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

import type { CubidWeb2Client } from "@cubid/browser";

import { mergeLook, resolveLook } from "./theme";
import type { CubidLook, ResolvedLook } from "./theme";

export interface CubidWeb2ProviderProps extends CubidLook {
  children: ReactNode;
  client: CubidWeb2Client;
}

const CubidWeb2Context = createContext<CubidWeb2Client | null>(null);
const LookContext = createContext<CubidLook>({});

/** The client, and optionally the look (theme tokens, class names, inline styles, labels) for every Cubid component below. */
export function CubidWeb2Provider({ children, classNames, client, labels, styles, theme }: CubidWeb2ProviderProps) {
  return (
    <CubidWeb2Context.Provider value={client}>
      <CubidThemeProvider classNames={classNames} labels={labels} styles={styles} theme={theme}>
        {children}
      </CubidThemeProvider>
    </CubidWeb2Context.Provider>
  );
}

/** Set the look once for a whole tree without a client (a page of the host app's own forms, say). */
export function CubidThemeProvider({ children, ...look }: CubidLook & { children: ReactNode }) {
  const parent = useContext(LookContext);
  const merged = useMemo(() => mergeLook(parent, look), [parent, look.theme, look.classNames, look.styles, look.labels]);
  return <LookContext.Provider value={merged}>{children}</LookContext.Provider>;
}

/** The resolved look for a component: the provider's, then the component's own on top. */
export function useCubidLook(own: CubidLook = {}): ResolvedLook {
  const fromContext = useContext(LookContext);
  return useMemo(() => resolveLook(mergeLook(fromContext, own)), [fromContext, own.theme, own.classNames, own.styles, own.labels]);
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
