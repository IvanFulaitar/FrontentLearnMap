import { useEffect, useState } from "react";
import type { CodeWalkthrough, Lesson } from "../../types/course";
import { MarkdownRenderer } from "../../shared/markdown/MarkdownRenderer";
import { Card } from "../ui/Card";
import { Callout } from "./Callout";
import { LessonPractice } from "./LessonPractice";
import { LessonToc } from "./LessonToc";
import { lessonDemos } from "./demos";
import styles from "./LessonContent.module.css";

interface LessonContentProps {
  lesson: Lesson;
}

const HTML_MARKUP_RE = /^\s*</;
// A "bare" CSS rule block: starts with a selector-ish string then `{`, no
// leading `<` (that would make it markup) and not JS/ASCII-diagram noise.
const CSS_RULE_ONLY_RE = /^[.#a-zA-Z0-9,\-_:()[\]"'=\s]*\{/;
const NON_CSS_HINT_RE = /[↑→]|^(const|let|var|function|document\.|import|export|async|await)\b/;
// Tags that never produce visible output in <body> — <head>-only metadata
// (SEO/Open Graph <meta>, <title>, <link rel="canonical">, favicon <link>...).
// A snippet made up of only these renders as a blank white box, which looks
// broken, not "live" — those topics get dedicated preview widgets instead
// (Google result card, social preview, robots.txt tester), not this frame.
// `<title>` is the odd one out here: unlike the void meta/link/base tags,
// it wraps real text (`<title>Ноутбук ASUS TUF A15 | Tech Store</title>`).
// The `[\s\S]*?` before the closing tag is what actually consumes that
// text — without it, only the bare `<title>` opening tag got removed and
// the visible-length check below still saw the title's own text as
// "content", wrongly treating a title+meta snippet (no wrapping <head>) as
// renderable and showing an empty "Живий результат" box (the browser
// never paints <title> text in the body, so the box always came out blank).
const INVISIBLE_HEAD_TAGS_RE = /<(meta|title|link|base)\b[^>]*?\/?>(?:[\s\S]*?<\/\1>)?/gi;
// Structural wrapper tags (<head>, <html>, <body>) are invisible themselves
// but their CONTENT might not be — strip just the tag markers (not what's
// inside) before running the invisible-tag check above, so a lesson
// snippet like `<head><meta ...><title>...</title></head>` correctly comes
// out empty instead of the wrapper alone counting as "visible".
const STRUCTURAL_WRAPPER_TAGS_RE = /<\/?(head|html|body)\b[^>]*>/gi;
// Any snippet that includes a <head> tag is illustrating something about
// the document's non-visual metadata/loading behaviour (render-blocking
// scripts, meta tags, favicons...) — the point is never what ends up
// painted in <body>, so no live preview is shown for these at all, even
// if a stray visible tag happens to sit alongside the <head> in the same
// snippet.
const HAS_HEAD_TAG_RE = /<head\b/i;
// External script sources never resolve inside the sandboxed preview (no
// server to fetch them from) — strip these before rendering so lesson
// snippets that reference an illustrative filename (`analytics.js`,
// `app.js`...) don't produce a console 404. Inline `<script>` blocks with
// no `src` are left untouched since those are real, self-contained demo
// code meant to actually run.
const EXTERNAL_SCRIPT_TAG_RE = /<script\b[^>]*\ssrc=["'][^"']*["'][^>]*>\s*<\/script>/gi;

function hasVisibleMarkup(html: string): boolean {
  return html
    .replace(STRUCTURAL_WRAPPER_TAGS_RE, "")
    .replace(INVISIBLE_HEAD_TAGS_RE, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim().length > 0;
}

/** "Погано / Добре" (bad/good) style comparison snippets often use literal
 * `...` as a stand-in for omitted content across several sibling tags
 * (`<div class="header">...</div>` etc.) — that's illustrative pseudocode
 * about structure, never meant to be taken literally. Rendered live it's
 * just a meaningless stack of "..." bullets, worse than no preview at all. */
function isPlaceholderOnlyContent(html: string): boolean {
  const textOnly = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .trim();
  if (!textOnly) return false;
  const tokens = textOnly.split(/\s+/).filter(Boolean);
  return tokens.length > 0 && tokens.every((token) => /^\.{2,}$/.test(token));
}

/** A later CSS-only block is only worth layering onto an earlier example if
 * it actually targets a class/id that example uses — otherwise the rule
 * silently matches nothing and the "live result" would misleadingly look
 * unchanged (e.g. a `.main-nav` rule shown against a lesson's unrelated
 * `.row`/`.box` demo markup from an earlier, different walkthrough). */
function cssTargetsHtml(css: string, html: string): boolean {
  const selectorNames = Array.from(css.matchAll(/[.#]([a-zA-Z0-9_-]+)/g)).map((match) => match[1]);
  return selectorNames.length > 0 && selectorNames.some((name) => html.includes(name));
}

/**
 * Classifies each `codeWalkthrough.code` in a lesson and, where the snippet
 * is genuinely renderable, produces the accumulated HTML+CSS document a
 * `LiveCodeFrame` should show underneath it. Walkthroughs build on each
 * other within one lesson (first shows full markup, later ones often add
 * just a CSS rule to that same example) — so a later CSS-only block is
 * layered on top of the most recent full-markup block instead of shown in
 * isolation with nothing to render against, but only when its selectors
 * actually match something in that markup. Snippets with no renderable HTML
 * context (a bare CSS rule with no earlier markup, one that targets a
 * different unshown example, an ASCII diagram, a raw JS statement) return
 * `null` — no live preview is faked for those, they stay copy-only.
 */
// Lesson `<img>` tags reference filenames that were never real files
// (`cat.jpg`, `headphones.jpg`, `logo.svg`...) — they're illustrative
// examples for reading code, not actual assets sitting anywhere, so the
// sandboxed preview would just show the browser's broken-image icon (as
// seen in the "Живий результат" box). A real `http(s)://` URL or an inline
// `data:` URI might genuinely load, so those are left untouched; anything
// else is swapped for a self-contained SVG placeholder built from the same
// `alt` text and `width`/`height` the lesson already wrote, so the live
// result always shows a real filled photo box instead of a broken icon.
const IMG_TAG_RE = /<img\b([^>]*)>/gi;
const attrPattern = (name: string) => new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i");
const SRC_ATTR_RE = attrPattern("src");
const ALT_ATTR_RE = attrPattern("alt");
const WIDTH_ATTR_RE = attrPattern("width");
const HEIGHT_ATTR_RE = attrPattern("height");
const SRCSET_ATTR_RE = /\s(?:srcset|sizes)\s*=\s*["'][^"']*["']/gi;
// `<source>` (inside `<picture>` for art-direction/format-fallback examples)
// takes priority over the `<img>` fallback whenever its own `srcset`
// resolves — since that `srcset` references the same kind of illustrative,
// non-existent filenames as `src` does, the browser would still show a
// broken-image icon even after `src` below gets a placeholder. There's no
// real narrower/format-specific asset to demonstrate here anyway, so these
// are dropped entirely and the `<img>` fallback (with its own placeholder)
// is what actually renders.
const SOURCE_TAG_RE = /<source\b[^>]*\/?>/gi;

function escapeSvgText(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function placeholderImageDataUri(width: number, height: number, altText: string): string {
  const label = altText.length > 34 ? `${altText.slice(0, 33)}…` : altText;
  const caption = label ? escapeSvgText(label) : "";
  const fontSize = Math.max(10, Math.min(width, height) * 0.075);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#e0e7ff" />
    <circle cx="${width * 0.78}" cy="${height * 0.28}" r="${Math.min(width, height) * 0.11}" fill="#c7d2fe" />
    <path d="M0 ${height} L${width * 0.32} ${height * 0.48} L${width * 0.52} ${height * 0.68} L${width * 0.74} ${height * 0.4} L${width} ${height * 0.85} L${width} ${height} Z" fill="#a5b4fc" />
    ${caption ? `<text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-family="sans-serif" font-size="${fontSize}" fill="#4338ca">${caption}</text>` : ""}
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " "))}`;
}

function replacePlaceholderImages(html: string): string {
  return html.replace(SOURCE_TAG_RE, "").replace(IMG_TAG_RE, (fullMatch, attrs: string) => {
    const srcMatch = SRC_ATTR_RE.exec(attrs);
    const src = srcMatch?.[1] ?? "";
    if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return fullMatch;
    const alt = ALT_ATTR_RE.exec(attrs)?.[1] ?? "";
    const width = Number(WIDTH_ATTR_RE.exec(attrs)?.[1]) || 320;
    const height = Number(HEIGHT_ATTR_RE.exec(attrs)?.[1]) || 200;
    const dataUri = placeholderImageDataUri(width, height, alt);
    const withPlaceholderSrc = srcMatch
      ? fullMatch.replace(srcMatch[0], `src="${dataUri}"`)
      : fullMatch.replace("<img", `<img src="${dataUri}"`);
    // A fake illustrative `srcset`/`sizes` on the same tag would otherwise
    // still win over the `src` swap above (the browser picks a candidate
    // from `srcset` whenever one resolves, ignoring `src` entirely) — same
    // failure mode as `<source>`, just on the `<img>` tag itself.
    return withPlaceholderSrc.replace(SRCSET_ATTR_RE, "");
  });
}

function buildLivePreviews(walkthroughs: CodeWalkthrough[]): (string | null)[] {
  let baseHtml: string | null = null;
  let layeredStyles: string[] = [];

  return walkthroughs.map((walkthrough) => {
    const code = walkthrough.code;
    const trimmed = code.trim();

    if (HTML_MARKUP_RE.test(trimmed)) {
      if (HAS_HEAD_TAG_RE.test(trimmed) || !hasVisibleMarkup(trimmed) || isPlaceholderOnlyContent(trimmed)) {
        // <head>-related snippet, head-only metadata (meta/title/link), or
        // "..." placeholder pseudocode — nothing meaningful to show in a
        // body preview. Don't set it as baseHtml either: a later CSS rule
        // has nothing real to attach to.
        return null;
      }
      baseHtml = code.replace(EXTERNAL_SCRIPT_TAG_RE, "");
      layeredStyles = [];
      return replacePlaceholderImages(baseHtml);
    }

    if (baseHtml && CSS_RULE_ONLY_RE.test(trimmed) && !NON_CSS_HINT_RE.test(trimmed) && cssTargetsHtml(trimmed, baseHtml)) {
      layeredStyles.push(code);
      return replacePlaceholderImages(`${baseHtml}\n<style>${layeredStyles.join("\n")}</style>`);
    }

    return null;
  });
}

let liveFrameSeq = 0;

/** Renders a code snippet's actual output in a sandboxed iframe — the real
 * browser result sitting right under the code, not just described in
 * prose. The sandbox intentionally grants `allow-scripts` only, never
 * `allow-same-origin` alongside it — that combination lets the framed
 * content script its way out of the sandbox entirely (a real browser
 * warning, not a style nitpick), and it's not needed here anyway: instead
 * of the parent reaching *into* the iframe to measure it, a tiny script
 * injected into the frame's own document measures itself and reports its
 * height out via `postMessage`, which works regardless of origin. Height
 * tracks content changes continuously via `ResizeObserver` running inside
 * the frame; `.liveFrame`'s CSS `max-height` is a hard cap so a bad
 * measurement can never balloon the box, it just scrolls instead.
 */
function LiveCodeFrame({ html }: { html: string }) {
  const [frameId] = useState(() => `live-frame-${++liveFrameSeq}`);
  const [height, setHeight] = useState(56);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data && typeof data === "object" && data.source === "lesson-live-frame" && data.frameId === frameId) {
        setHeight(Math.max(40, Number(data.height) + 4));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [frameId]);

  const document_ = `<!doctype html><html><head><meta charset="utf-8"><style>
    /* Café project design tokens (see cssFoundations.ts / cssVariablesDarkMode.ts).
       Most lesson snippets reference these via var(--color-primary) etc.
       without redeclaring :root every time (it's shown once, early in the
       course) — without a real value here they'd render invisible/blank
       (an undefined custom property resolves to nothing, not "unset" back
       to a sensible default). Declaring the real project values once, here,
       makes every such snippet across the whole site render correctly. */
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
  </style></head><body>${html}<script>
    (function () {
      var report = function () {
        parent.postMessage({ source: "lesson-live-frame", frameId: ${JSON.stringify(frameId)}, height: document.body.scrollHeight }, "*");
      };
      report();
      new ResizeObserver(report).observe(document.body);
    })();
  </script></body></html>`;

  return (
    <iframe
      srcDoc={document_}
      className={styles.liveFrame}
      style={{ height: `${height}px` }}
      sandbox="allow-scripts"
      title="Живий результат коду"
    />
  );
}

/** Code block with a working "copy" button — real interactivity on every
 * code walkthrough, not just a static, unselectable screenshot-like block. */
function CopyableCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {
        /* clipboard API unavailable — button simply won't confirm */
      });
  };

  return (
    <div className={styles.codeBlock}>
      <button type="button" className={styles.copyButton} onClick={handleCopy}>
        {copied ? "✔ Скопійовано" : "⧉ Копіювати код"}
      </button>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

/** Comparison table where clicking a row highlights it — a small nudge to
 * actually compare rows against each other instead of just reading text. */
function InteractiveComparisonTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {table.headers.map((header) => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, index) => (
          <tr
            key={row.join("|")}
            className={active === index ? styles.tableRowActive : undefined}
            role="button"
            tabIndex={0}
            onClick={() => setActive((current) => (current === index ? null : index))}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive((current) => (current === index ? null : index));
              }
            }}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} data-label={table.headers[cellIndex]}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Long hand-written `whatIsIt`/`whyUseIt` copy is authored as one dense
 * paragraph (easier to write and to keep facts self-contained), but a single
 * unbroken block of 5-8 sentences reads as a wall of text in the UI. Authors
 * can opt into paragraph breaks by inserting a blank line ("\n\n") at natural
 * topic boundaries; this renders each chunk as its own <p> without dropping
 * or rewriting any content. Text with no blank line renders exactly as
 * before (a single <p>), so this is fully backward-compatible with every
 * existing lesson file.
 */
function ParagraphText({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </>
  );
}

/**
 * Cheat-sheet layout used only for lessons with hand-written `whatIsIt`
 * content (currently: the hand-authored HTML modules). No "Теорія" section,
 * no separate "best practices" / "real-world usage" cards — everything a
 * junior dev would actually re-read 5 minutes before an interview, and
 * nothing else. Every other course keeps rendering the pipeline below
 * (`LegacyLessonContent`) exactly as before.
 */
function CheatSheetLessonContent({ lesson }: LessonContentProps) {
  const sections = [
    ["what", "🎯 Що це?"],
    ["why", "🤔 Навіщо це потрібно"],
    ["see", "👀 Подивись у дії"],
    ["how", "💻 Як використовувати"],
    ["not", "❌ Чого НЕ робити"],
    ["practice", "🛠 Практика"],
    ["senior", "✅ Як роблять у реальних проєктах"],
    ["remember", "🧠 Запам'ятай"],
    ["interview", "🎤 Питання на співбесіді"],
    ["summary", "📚 Коротко"],
  ] as const;

  const seniorTips = [...(lesson.bestPractices ?? []), ...(lesson.realWorldUsage ?? [])];
  const rememberTop5 = (lesson.remember ?? []).slice(0, 5);
  const walkthroughPreviews = lesson.codeWalkthroughs ? buildLivePreviews(lesson.codeWalkthroughs) : [];
  const Demo = lesson.interactiveDemo ? lessonDemos[lesson.interactiveDemo] : undefined;

  return (
    <div className={styles.content}>
      <div className={styles.docs}>
        <Card className={styles.section} id="what">
          <h2>🎯 Що це?</h2>
          <ParagraphText text={lesson.whatIsIt ?? ""} />
        </Card>

        {lesson.whyUseIt ? (
          <Card className={styles.section} id="why">
            <h2>🤔 Навіщо це потрібно</h2>
            <ParagraphText text={lesson.whyUseIt} />
          </Card>
        ) : null}

        {lesson.visualExplanation || Demo ? (
          <Card className={styles.section} id="see">
            <h2>👀 Подивись у дії</h2>
            {lesson.visualExplanation ? (
              <figure className={styles.visual}>
                <div aria-hidden="true" dangerouslySetInnerHTML={{ __html: lesson.visualExplanation.svg }} />
                {lesson.visualExplanation.caption ? (
                  <figcaption>{lesson.visualExplanation.caption}</figcaption>
                ) : null}
              </figure>
            ) : null}
            {Demo ? (
              <div className={styles.demoBlock}>
                <p className={styles.demoLabel}>🕹 Спробуй сам — зміни значення й подивись, що станеться:</p>
                <Demo />
              </div>
            ) : null}
          </Card>
        ) : null}

        <Card className={styles.section} id="how">
          <h2>💻 Як використовувати</h2>
          {lesson.whenToUse?.length ? (
            <ul className={styles.checkList}>
              {lesson.whenToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : null}
          {lesson.comparisonTable ? <InteractiveComparisonTable table={lesson.comparisonTable} /> : null}
          {lesson.codeWalkthroughs?.length ? (
            lesson.codeWalkthroughs.map((walkthrough, index) => (
              <div className={styles.walkthrough} key={index}>
                {walkthrough.before ? <p>{walkthrough.before}</p> : null}
                <CopyableCode code={walkthrough.code} />
                {walkthroughPreviews[index] ? (
                  <div className={styles.livePreviewBlock}>
                    <p className={styles.livePreviewLabel}>▶ Живий результат:</p>
                    <LiveCodeFrame html={walkthroughPreviews[index] as string} />
                  </div>
                ) : null}
                {walkthrough.lineNotes?.length ? (
                  <ul className={styles.list}>
                    {walkthrough.lineNotes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                ) : null}
                {walkthrough.after ? <p>{walkthrough.after}</p> : null}
              </div>
            ))
          ) : null}
        </Card>

        {lesson.whenNotToUse?.length || lesson.dontDoThis || lesson.commonMistakes?.length ? (
          <Card className={styles.section} id="not">
            <h2>❌ Чого НЕ робити</h2>
            {lesson.dontDoThis ? (
              <Callout kind="warning" title="Поганий приклад">
                <pre className={styles.code}>
                  <code>{lesson.dontDoThis.code}</code>
                </pre>
                <p>{lesson.dontDoThis.explanation}</p>
              </Callout>
            ) : null}
            {lesson.whenNotToUse?.length ? (
              <ul className={styles.badList}>
                {lesson.whenNotToUse.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {lesson.commonMistakes?.length ? (
              <ul className={styles.badList}>
                {lesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </Card>
        ) : null}

        <Card className={styles.section} id="practice">
          <h2>🛠 Практика</h2>
          <LessonPractice practiceTask={lesson.practiceTask} microExercises={lesson.microExercises} />
        </Card>

        {seniorTips.length || lesson.proTip ? (
          <Card className={styles.section} id="senior">
            <h2>✅ Як роблять у реальних проєктах</h2>
            {seniorTips.length ? (
              <ul className={styles.checkList}>
                {seniorTips.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
            {lesson.proTip ? <Callout kind="tip" title="💡 Порада">{lesson.proTip}</Callout> : null}
          </Card>
        ) : null}

        {rememberTop5.length ? (
          <Callout kind="remember" title="🧠 Запам'ятай">
            <ul className={styles.list}>
              {rememberTop5.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Callout>
        ) : null}

        {lesson.interviewQuestions?.length ? (
          <Card className={styles.section} id="interview">
            <h2>🎤 Питання на співбесіді</h2>
            {lesson.interviewQuestions.map((item) => (
              <details className={styles.interviewItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Card>
        ) : null}

        <Card className={styles.section} id="summary">
          <h2>📚 Коротко</h2>
          <p>{lesson.summary}</p>
          {lesson.nextLessonNote ? <p>{lesson.nextLessonNote}</p> : null}
        </Card>
      </div>
      <LessonToc
        sections={sections.filter(([id]) => {
          if (id === "why") return Boolean(lesson.whyUseIt);
          if (id === "see") return Boolean(lesson.visualExplanation || Demo);
          if (id === "not") return Boolean(lesson.whenNotToUse?.length || lesson.dontDoThis || lesson.commonMistakes?.length);
          if (id === "senior") return Boolean(seniorTips.length || lesson.proTip);
          if (id === "interview") return Boolean(lesson.interviewQuestions?.length);
          return true;
        }) as [string, string][]}
      />
    </div>
  );
}

function LegacyLessonContent({ lesson }: LessonContentProps) {
  const sections = [
    ["what", "Що це?"],
    ["why", "Навіщо це потрібно"],
    ["know", "Чого ти навчишся"],
    ["when", "Коли використовувати"],
    ["when-not", "Коли НЕ використовувати"],
    ["theory", "Теорія"],
    ["examples", "Приклади"],
    ["practice", "Практика"],
    ["mistakes", "Типові помилки"],
    ["dont", "Не роби так"],
    ["best-practices", "Best practices"],
    ["real-world", "У реальних проєктах"],
    ["interview", "На співбесіді"],
    ["summary", "Коротко"],
    ["pro-tip", "Pro tip"],
    ["next", "Що вивчити далі"],
  ] as const;

  return (
    <div className={styles.content}>
      <div className={styles.docs}>
        <Card className={styles.section} id="what">
          <h2>Що це?</h2>
          {lesson.whatIsIt ? <ParagraphText text={lesson.whatIsIt} /> : <MarkdownRenderer content={`## ${lesson.title}\n\n${lesson.description}`} />}
        </Card>

        {lesson.whyUseIt || lesson.motivation ? (
          <Card className={styles.section} id="why">
            <h2>Навіщо це потрібно</h2>
            <Callout kind="motivation"><ParagraphText text={lesson.whyUseIt ?? lesson.motivation ?? ""} /></Callout>
          </Card>
        ) : null}

        <Card className={styles.section} id="know">
          <h2>Чого ти навчишся</h2>
          <ul className={styles.checkList}>
            {lesson.learningObjectives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Card>

        {lesson.whenToUse?.length ? (
          <Card className={styles.section} id="when">
            <h2>Коли використовувати</h2>
            <ul className={styles.checkList}>
              {lesson.whenToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ) : null}

        {lesson.whenNotToUse?.length ? (
          <Card className={styles.section} id="when-not">
            <h2>Коли НЕ використовувати</h2>
            <ul className={styles.list}>
              {lesson.whenNotToUse.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ) : null}

        <Card className={styles.section} id="theory">
          <h2>Теорія</h2>
          {lesson.theorySteps?.length ? (
            <div className={styles.steps}>
              {lesson.theorySteps.map((step) => (
                <div className={styles.step} key={step.heading}>
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>{lesson.theory}</p>
          )}
          {lesson.analogy ? <Callout kind="analogy">{lesson.analogy}</Callout> : null}
        </Card>

        <Card className={styles.section} id="examples">
          <h2>Приклади</h2>
          {lesson.codeWalkthroughs?.length ? (
            lesson.codeWalkthroughs.map((walkthrough, index) => (
              <div className={styles.walkthrough} key={index}>
                <p>{walkthrough.before}</p>
                <pre className={styles.code}>
                  <code>{walkthrough.code}</code>
                </pre>
                {walkthrough.lineNotes?.length ? (
                  <ul className={styles.list}>
                    {walkthrough.lineNotes.map((note) => <li key={note}>{note}</li>)}
                  </ul>
                ) : null}
                <p>{walkthrough.after}</p>
              </div>
            ))
          ) : (
            <pre className={styles.code}>
              <code>{lesson.codeExample}</code>
            </pre>
          )}
          {/* Rendered regardless of whether a narrated walkthrough exists
              above, so the "try it yourself" variations aren't hidden now
              that every lesson has a codeWalkthrough. */}
          {lesson.examples?.length ? (
            <>
              <h3>Спробуй сам</h3>
              <ul className={styles.list}>{lesson.examples.map((item) => <li key={item}>{item}</li>)}</ul>
            </>
          ) : null}
        </Card>

        <Card className={styles.section} id="practice">
          <h2>Практика</h2>
          <LessonPractice practiceTask={lesson.practiceTask} microExercises={lesson.microExercises} />
        </Card>

        <Card className={styles.section} id="mistakes">
          <h2>Типові помилки</h2>
          <ul className={styles.list}>{lesson.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
        </Card>

        {lesson.dontDoThis ? (
          <Card className={styles.section} id="dont">
            <h2>Не роби так</h2>
            <Callout kind="warning" title="Поганий приклад">
              <pre className={styles.code}>
                <code>{lesson.dontDoThis.code}</code>
              </pre>
              <p>{lesson.dontDoThis.explanation}</p>
            </Callout>
          </Card>
        ) : null}

        {lesson.bestPractices?.length ? (
          <Card className={styles.section} id="best-practices">
            <h2>Best practices</h2>
            <Callout kind="bestPractice" title="Як роблять досвідчені розробники">
              <ul className={styles.list}>
                {lesson.bestPractices.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Callout>
          </Card>
        ) : null}

        {lesson.realWorldUsage?.length ? (
          <Card className={styles.section} id="real-world">
            <h2>У реальних проєктах</h2>
            <ul className={styles.list}>{lesson.realWorldUsage.map((item) => <li key={item}>{item}</li>)}</ul>
          </Card>
        ) : null}

        {lesson.interviewQuestions?.length ? (
          <Card className={styles.section} id="interview">
            <h2>На співбесіді</h2>
            {lesson.interviewQuestions.map((item) => (
              <details className={styles.interviewItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </Card>
        ) : null}

        {lesson.remember?.length ? (
          <Callout kind="remember" title="Запамʼятай">
            <ul className={styles.list}>
              {lesson.remember.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Callout>
        ) : null}

        <Card className={styles.section} id="summary">
          <h2>Коротко</h2>
          <p>{lesson.summary}</p>
        </Card>

        {lesson.proTip ? (
          <Card className={styles.section} id="pro-tip">
            <h2>Pro tip</h2>
            <Callout kind="tip" title="💡 Порада з реальних проєктів">{lesson.proTip}</Callout>
          </Card>
        ) : null}

        <Card className={styles.section} id="next">
          <h2>Що вивчити далі</h2>
          {lesson.nextLessonNote ? <p>{lesson.nextLessonNote}</p> : null}
          <ul className={styles.list}>{lesson.nextSteps.map((item) => <li key={item}>{item}</li>)}</ul>
        </Card>
      </div>
      <LessonToc
        sections={sections.filter(([id]) => {
          if (id === "why") return Boolean(lesson.whyUseIt || lesson.motivation);
          if (id === "when") return Boolean(lesson.whenToUse?.length);
          if (id === "when-not") return Boolean(lesson.whenNotToUse?.length);
          if (id === "dont") return Boolean(lesson.dontDoThis);
          if (id === "best-practices") return Boolean(lesson.bestPractices?.length);
          if (id === "real-world") return Boolean(lesson.realWorldUsage?.length);
          if (id === "interview") return Boolean(lesson.interviewQuestions?.length);
          if (id === "pro-tip") return Boolean(lesson.proTip);
          return true;
        }) as [string, string][]}
      />
    </div>
  );
}

export function LessonContent({ lesson }: LessonContentProps) {
  // Hand-written cheat-sheet lessons always set `whatIsIt`; every other
  // lesson (all generated courses, plus any HTML lesson without an override)
  // keeps rendering the original pipeline untouched.
  return lesson.whatIsIt ? <CheatSheetLessonContent lesson={lesson} /> : <LegacyLessonContent lesson={lesson} />;
}
