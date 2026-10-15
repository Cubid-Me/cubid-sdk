import type { createNativeController } from "./controller";

interface Links {
  getInitialURL(): Promise<string | null>;
  subscribe(listener: (url: string) => void): () => void;
}

/** Start restoration before registering warm links or awaiting the OS initial URL. */
export function connectNativeLinks(session: ReturnType<typeof createNativeController>, links: Links, browserActive: () => boolean) {
  let live = true;
  void session.initialize();
  const unsubscribe = links.subscribe((url) => { if (live && !browserActive()) void session.handleIncoming(url); });
  void links.getInitialURL().then((url) => { if (live && url) return session.handleIncoming(url); }).catch(() => {});
  return () => { live = false; unsubscribe(); };
}
