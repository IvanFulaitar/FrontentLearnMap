import type { ReactNode } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, Lightbulb, Sparkles, StickyNote } from "lucide-react";
import styles from "./Callout.module.css";

export type CalloutKind = "motivation" | "analogy" | "tip" | "warning" | "note" | "fact" | "bestPractice" | "remember";

const iconFor: Record<CalloutKind, ReactNode> = {
  motivation: <Sparkles size={20} />,
  analogy: <Lightbulb size={20} />,
  tip: <CheckCircle2 size={20} />,
  warning: <AlertTriangle size={20} />,
  note: <StickyNote size={20} />,
  fact: <BookOpen size={20} />,
  bestPractice: <CheckCircle2 size={20} />,
  remember: <Sparkles size={20} />,
};

const defaultTitleFor: Record<CalloutKind, string> = {
  motivation: "Навіщо це потрібно",
  analogy: "Уяви так",
  tip: "Порада",
  warning: "Увага",
  note: "Примітка",
  fact: "Чи знав ти?",
  bestPractice: "Best practice",
  remember: "Запамʼятай",
};

export function Callout({ kind, title, children }: { kind: CalloutKind; title?: string; children: ReactNode }) {
  return (
    <div className={`${styles.callout} ${styles[kind]}`}>
      <span className={styles.icon} aria-hidden="true">{iconFor[kind]}</span>
      <div>
        <div className={styles.title}>{title ?? defaultTitleFor[kind]}</div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
