import { useEffect, useRef, useState } from "react";
import styles from "./LiveCodeEditor.module.css";

/**
 * Tab visibility follows what the lesson is actually teaching — don't pass
 * `css`/`js` just to "fill them in":
 * - Pure HTML lesson → pass only `html`. Just the HTML tab shows.
 * - CSS lesson → pass `html` + `css`. HTML and CSS tabs show.
 * - JS lesson → pass `html` + `css` + `js` (css can be `""` if styling
 *   genuinely isn't the point). All three tabs show.
 */
export interface LiveCodeEditorProps {
  /** Starter HTML markup (body content). Always shown/editable. */
  html: string;
  /** Starter CSS. Omit entirely to hide the CSS tab. */
  css?: string;
  /** Starter JS. Omit entirely to hide the JS tab. */
  js?: string;
}

type Tab = "html" | "css" | "js";

interface ConsoleLine {
  id: number;
  level: "log" | "warn" | "error";
  text: string;
}

let runSeq = 0;
let consoleLineSeq = 0;

/**
 * A real, editable HTML/CSS/JS playground rendered in a sandboxed iframe —
 * the one deliberate, scoped exception to this platform's "no live editor"
 * rule (see MicroExercise's doc comment). Everywhere else on the site,
 * practice stays self-check (write in your own editor, reveal the
 * solution). This component exists ONLY for a hand-picked set of lesson
 * "Подивись у дії" demos where actually running the student's own tweaks
 * teaches the concept faster than a static example — it is opt-in per
 * lesson via `lesson.liveEditor`, never a replacement for the
 * practice/challenge flow.
 *
 * Safety model:
 * - iframe uses `sandbox="allow-scripts"` only — never `allow-same-origin`
 *   alongside it, since that combination would let the framed content
 *   script its way out of the sandbox. It also gets its own opaque origin
 *   (via `srcDoc`), which is what lets browsers isolate a hung/looping
 *   script into its own process rather than blocking the parent page.
 * - User JS runs inside a try/catch IIFE in its OWN <script> tag, followed
 *   by a separate <script> tag that pings the parent to say "I finished".
 *   Script tags execute sequentially regardless of an uncaught error in an
 *   earlier one, so that ping still fires even if the user's code throws —
 *   only a genuine hang (e.g. `while (true) {}`) prevents it from arriving.
 *   If the parent doesn't hear back within a few seconds, it assumes a
 *   hang, discards the iframe (remounts a fresh one via `key`), and tells
 *   the student instead of leaving them staring at a frozen box.
 * - console.log/warn/error and runtime errors are forwarded out via
 *   postMessage and rendered in a small console strip under the result —
 *   there's no way to see them otherwise since the sandboxed frame has no
 *   real devtools console the student can casually open.
 */
export function LiveCodeEditor({ html, css, js }: LiveCodeEditorProps) {
  const hasCss = css !== undefined;
  const hasJs = js !== undefined;

  const [activeTab, setActiveTab] = useState<Tab>("html");
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css ?? "");
  const [jsCode, setJsCode] = useState(js ?? "");
  const [srcDoc, setSrcDoc] = useState("");
  const [frameKey, setFrameKey] = useState(0);
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "hung">("idle");
  // The result stays a placeholder until the student explicitly clicks
  // "Виконати" — nothing runs automatically on load or on every keystroke.
  const [hasRun, setHasRun] = useState(false);

  const runIdRef = useRef(0);
  const hangTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildDocument = (currentHtml: string, currentCss: string, currentJs: string, runId: number) => {
    const userScript = hasJs
      ? `<script>(function(){try{\n${currentJs}\n}catch(e){window.parent.postMessage({source:"live-code-editor",kind:"error",runId:${runId},text:String(e && e.message ? e.message : e)},"*");}})();</script>`
      : "";
    return `<!doctype html><html><head><meta charset="utf-8"><style>
      :root {
        --color-primary: #b45309;
        --color-bg: #ffffff;
        --color-text: #1f2937;
        --color-surface: #f9fafb;
        --space-sm: 0.5rem;
        --space-md: 1rem;
        --space-lg: 2rem;
        --radius: 8px;
        --font-base: 1rem;
        --font-lg: 1.25rem;
        --font-xl: 1.5rem;
      }
      * { box-sizing: border-box; }
      body { margin: 0; padding: 16px; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; color: #1a1a1a; background: #ffffff; }
      ${currentCss}
    </style></head><body>${currentHtml}
    <script>
      (function () {
        var send = function (kind, extra) {
          window.parent.postMessage(Object.assign({ source: "live-code-editor", runId: ${runId} }, { kind: kind }, extra || {}), "*");
        };
        var serialize = function (arg) {
          if (typeof arg === "string") return arg;
          try { return JSON.stringify(arg); } catch (e) { return String(arg); }
        };
        ["log", "warn", "error"].forEach(function (level) {
          var original = console[level];
          console[level] = function () {
            var args = Array.prototype.slice.call(arguments).map(serialize);
            send("console", { level: level, text: args.join(" ") });
            original.apply(console, arguments);
          };
        });
        window.onerror = function (message) {
          send("error", { text: String(message) });
          return true;
        };
        window.addEventListener("unhandledrejection", function (event) {
          send("error", { text: "Unhandled promise rejection: " + String(event.reason) });
        });
      })();
    </script>
    ${userScript}
    <script>window.parent.postMessage({ source: "live-code-editor", kind: "executed", runId: ${runId} }, "*");</script>
    </body></html>`;
  };

  const run = (nextHtml = htmlCode, nextCss = cssCode, nextJs = jsCode) => {
    if (hangTimerRef.current) clearTimeout(hangTimerRef.current);
    runSeq += 1;
    const runId = runSeq;
    runIdRef.current = runId;
    setConsoleLines([]);
    setStatus("running");
    setHasRun(true);
    setSrcDoc(buildDocument(nextHtml, nextCss, nextJs, runId));
    hangTimerRef.current = setTimeout(() => {
      if (runIdRef.current === runId) {
        setStatus("hung");
        setFrameKey((key) => key + 1);
        setSrcDoc("");
      }
    }, 3000);
  };

  useEffect(() => {
    // A new lesson mounted (different starter code) — reset the editor back
    // to its untouched, not-yet-run state instead of auto-executing.
    setHtmlCode(html);
    setCssCode(css ?? "");
    setJsCode(js ?? "");
    setHasRun(false);
    setSrcDoc("");
    setConsoleLines([]);
    setStatus("idle");
    return () => {
      if (hangTimerRef.current) clearTimeout(hangTimerRef.current);
    };
  }, [html, css, js]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || typeof data !== "object" || data.source !== "live-code-editor") return;
      if (data.runId !== runIdRef.current) return;
      if (data.kind === "executed") {
        if (hangTimerRef.current) clearTimeout(hangTimerRef.current);
        setStatus("idle");
      } else if (data.kind === "console" || data.kind === "error") {
        consoleLineSeq += 1;
        setConsoleLines((lines) => [
          ...lines,
          { id: consoleLineSeq, level: data.kind === "error" ? "error" : data.level, text: data.text },
        ].slice(-30));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleReset = () => {
    setHtmlCode(html);
    setCssCode(css ?? "");
    setJsCode(js ?? "");
    setHasRun(false);
    setSrcDoc("");
    setConsoleLines([]);
    setStatus("idle");
  };

  const tabs: { id: Tab; label: string; dotClassName: string }[] = [
    { id: "html", label: "HTML", dotClassName: styles.dotHtml },
    ...(hasCss ? [{ id: "css" as Tab, label: "CSS", dotClassName: styles.dotCss }] : []),
    ...(hasJs ? [{ id: "js" as Tab, label: "JS", dotClassName: styles.dotJs }] : []),
  ];

  const activeCode = activeTab === "html" ? htmlCode : activeTab === "css" ? cssCode : jsCode;
  const setActiveCode = (value: string) => {
    if (activeTab === "html") setHtmlCode(value);
    else if (activeTab === "css") setCssCode(value);
    else setJsCode(value);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.tabStrip}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={`${styles.dot} ${tab.dotClassName}`} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
        <div className={styles.tabSpacer} />
        <button type="button" className={styles.actionButton} onClick={() => run()}>
          ▶ Виконати
        </button>
        <button type="button" className={styles.actionButtonGhost} onClick={handleReset}>
          ↺ Скинути
        </button>
      </div>

      <textarea
        className={styles.codeArea}
        value={activeCode}
        onChange={(event) => setActiveCode(event.target.value)}
        spellCheck={false}
        aria-label={`Редагувати ${activeTab.toUpperCase()}`}
      />

      <div className={styles.resultLabel}>Результат</div>
      <div className={styles.resultFrameWrap}>
        <div className={styles.resizeBox}>
          {status === "hung" ? (
            <div className={styles.hungMessage}>
              Схоже, код завис (можливо, нескінченний цикл). Редактор перезапущено — виправ код і натисни «Виконати» ще раз.
            </div>
          ) : !hasRun ? (
            <div className={styles.placeholder}>
              <span className={styles.placeholderIcon} aria-hidden="true">▶</span>
              Натисни «Виконати», щоб побачити результат
            </div>
          ) : (
            <iframe
              key={frameKey}
              srcDoc={srcDoc}
              className={styles.resultFrame}
              sandbox="allow-scripts"
              title="Результат виконання коду"
            />
          )}
        </div>
      </div>

      {consoleLines.length > 0 ? (
        <div className={styles.consolePanel}>
          {consoleLines.map((line) => (
            <div key={line.id} className={`${styles.consoleLine} ${styles[`console_${line.level}`]}`}>
              {line.text}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
