import type { ReactNode } from "react";
import { Callout } from "../../Callout";

/** The one sentence a student should still remember about this demo six
 * months from now. Reuses the app's existing Callout so it looks identical
 * to every other "🧠 Запам'ятай" box in the lesson, not a demo-only style. */
export function DemoKeyTakeaway({ children }: { children: ReactNode }) {
  return (
    <Callout kind="remember" title="🧠 Головне, що варто запам'ятати">
      {children}
    </Callout>
  );
}
