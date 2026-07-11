import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import styles from "./LessonContent.module.css";

const TOC_COLLAPSED_KEY = "frontend-academy:lesson-toc-collapsed";

const readCollapsed = (): boolean => {
  try {
    return localStorage.getItem(TOC_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
};

/** Splits a "🎯 Що це?" label into its leading emoji and the rest of the
 * text — used to show just the emoji when the sidebar collapses to an icon
 * rail below, while the full label stays available via `aria-label`/`title`
 * for accessibility. */
function splitEmoji(label: string): { emoji: string; text: string } {
  const spaceIndex = label.indexOf(" ");
  return spaceIndex === -1
    ? { emoji: label, text: "" }
    : { emoji: label.slice(0, spaceIndex), text: label.slice(spaceIndex + 1) };
}

interface LessonTocProps {
  sections: [string, string][];
}

/**
 * Sticky lesson table-of-contents. Collapsible to a slim emoji-only icon
 * rail — mirrors the app's own left Sidebar rail mode (see Sidebar.tsx) —
 * so the reading column can use the freed width on wide screens. The choice
 * is remembered (localStorage) across lessons, the same way the main
 * sidebar's collapsed state is.
 *
 * Below the `.content` two-column breakpoint (980px) the TOC already
 * stacks under the lesson body full-width (see the `@media` rule in
 * LessonContent.module.css), so collapsing only changes anything on
 * desktop/wide-tablet layouts — the toggle still renders below that
 * breakpoint, it just has no meaningfully different layout to switch to.
 */
export function LessonToc({ sections }: LessonTocProps) {
  const [collapsed, setCollapsed] = useState(readCollapsed);

  useEffect(() => {
    try {
      localStorage.setItem(TOC_COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      // Ignore write failures (private mode, full storage) — the toggle
      // still works for the current session, it just won't persist.
    }
  }, [collapsed]);

  return (
    <Card className={`${styles.toc} ${collapsed ? styles.tocCollapsed : ""}`}>
      <div className={styles.tocHeader}>
        <strong className={styles.tocTitle}>Зміст уроку</strong>
        <Button
          variant="ghost"
          className={styles.tocToggle}
          onClick={() => setCollapsed((current) => !current)}
          aria-label={collapsed ? "Розгорнути зміст уроку" : "Згорнути зміст уроку"}
          aria-expanded={!collapsed}
          title={collapsed ? "Розгорнути зміст уроку" : "Згорнути зміст уроку"}
        >
          {collapsed ? <PanelRightOpen size={16} /> : <PanelRightClose size={16} />}
        </Button>
      </div>
      {sections.map(([id, label]) => {
        const { emoji, text } = splitEmoji(label);
        return (
          <a href={`#${id}`} key={id} className={styles.tocLink} aria-label={label} title={collapsed ? label : undefined}>
            <span aria-hidden="true">{emoji}</span>
            {text ? <span className={styles.tocLinkText}>{` ${text}`}</span> : null}
          </a>
        );
      })}
    </Card>
  );
}
