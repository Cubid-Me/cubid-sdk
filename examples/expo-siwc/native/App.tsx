import { useEffect, useRef, useState } from "react";
import { Button, Linking, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { fetch as expoFetch } from "expo/fetch";
import { createHttpReferenceClient } from "../transport";
import { createNativeController } from "./controller";
import type { Message, NativeSnapshot } from "./controller";
import { createExpoPorts } from "./expo-ports";
import { configuration } from "./config";

const messages: Record<Message, string> = {
  signed_out: "Signed out of the reference app.", signed_in: "App session verified by the reference backend.", restored: "Existing app session verified by the backend.",
  working: "Working…", awaiting_callback: "Waiting for the interrupted ceremony's callback.", cancelled: "Ceremony cancelled.", denied: "Ceremony denied; no action confirmed.",
  confirmed: "Fresh same-subject step-up confirmed the no-op demo.", unavailable: "Reference backend unavailable or validation failed. Retry or sign out.", storage_error: "Secure storage failed. No new session is accepted.",
};
export default function App() {
  const controller = useRef<ReturnType<typeof createNativeController> | null>(null);
  const [state, setState] = useState<NativeSnapshot>({ signedIn: false, busy: true, pending: false, message: "working" });
  useEffect(() => {
    const ports = createExpoPorts(createHttpReferenceClient(configuration.backendOrigin, expoFetch));
    const session = createNativeController(ports, configuration);
    controller.current = session;
    const unsubscribe = session.subscribe(() => setState(session.getSnapshot()));
    let live = true;
    void Linking.getInitialURL().then((url) => { if (live) return session.initialize(url); }).catch(() => { if (live) void session.initialize(); });
    const subscription = Linking.addEventListener("url", ({ url }) => {
      // Active AuthSession owns its returned URL; only interrupted/out-of-session app links use this path.
      if (!ports.isBrowserActive()) void session.handleIncoming(url);
    });
    return () => { live = false; unsubscribe(); subscription.remove(); session.dispose(); controller.current = null; };
  }, []);
  return <SafeAreaView style={styles.screen}>
    <Text style={styles.eyebrow}>CUBID SDK REFERENCE</Text>
    <Text style={styles.title}>Native sign-in</Text>
    <Text style={styles.body}>Local configuration with synthetic issuer/client values. No listening backend, registration or real-device acceptance is implied.</Text>
    <View style={styles.status} accessibilityLiveRegion="polite"><Text>{messages[state.message]}</Text></View>
    <View style={styles.actions}>
      <Button title="Sign in with Cubid" disabled={state.busy || state.signedIn} onPress={() => { void controller.current?.signIn(); }} />
      <Button title="Confirm no-op demo" disabled={state.busy || !state.signedIn} onPress={() => { void controller.current?.confirmDemoAction(); }} />
      <Button title="Cancel ceremony" disabled={!state.busy && !state.pending} onPress={() => { void controller.current?.cancel(); }} />
      <Button title="Sign out of reference app" onPress={() => { void controller.current?.logout(); }} />
      <Button title="Retry status" disabled={state.busy} onPress={() => { void controller.current?.initialize(); }} />
    </View>
    <Text style={styles.body}>Only an opaque app credential is stored on device. Cubid tokens stay on the reference backend.</Text>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 28, gap: 20, backgroundColor: "#f7f8fa" },
  eyebrow: { fontSize: 12, letterSpacing: 2, color: "#46556b", marginTop: 32 },
  title: { fontSize: 32, fontWeight: "600", color: "#172233" },
  body: { fontSize: 15, lineHeight: 23, color: "#46556b" },
  status: { padding: 18, backgroundColor: "#e9eef4", borderRadius: 8 }, actions: { gap: 12 },
});
