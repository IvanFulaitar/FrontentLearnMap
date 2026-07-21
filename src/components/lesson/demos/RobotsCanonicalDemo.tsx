import { useMemo, useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const SAMPLE_PATHS = ["/", "/menu", "/admin/panel"];

/** Minimal real Disallow-prefix matcher — same logic a crawler uses: a
 * path is blocked if it starts with any Disallow prefix from the (single)
 * User-agent: * group the textarea contains. */
function isBlocked(path: string, robotsText: string): boolean {
  const disallowLines = robotsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.toLowerCase().startsWith("disallow:"))
    .map((line) => line.slice("disallow:".length).trim())
    .filter((prefix) => prefix.length > 0);
  return disallowLines.some((prefix) => path.startsWith(prefix));
}

/**
 * Live demo for "Favicon, robots.txt і canonical URL": an editable
 * robots.txt textarea whose Disallow rules are genuinely parsed against
 * 3 sample URLs — edit the rules and the allow/block verdicts below
 * recompute from that real text, not from a fixed example.
 */
export function RobotsCanonicalDemo() {
  const [robotsText, setRobotsText] = useState("User-agent: *\nAllow: /\nDisallow: /admin/");
  const [canonical, setCanonical] = useState("https://aroma-cafe.com/");

  const verdicts = useMemo(
    () => SAMPLE_PATHS.map((path) => ({ path, blocked: isBlocked(path, robotsText) })),
    [robotsText],
  );
  const canonicalAbsolute = /^https?:\/\//.test(canonical);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Онови robots.txt нижче — вердикт для кожної адреси перераховується по-справжньому">
        <label className={styles.sfLabel} htmlFor="demo-robots-text">
          robots.txt
        </label>
        <textarea
          id="demo-robots-text"
          className={styles.rcTextarea}
          rows={4}
          value={robotsText}
          onChange={(event) => setRobotsText(event.target.value)}
        />

        <ul className={styles.rcVerdictList}>
          {verdicts.map(({ path, blocked }) => (
            <li key={path} className={blocked ? styles.rcBlocked : styles.rcAllowed}>
              <code>{path}</code> — {blocked ? "заборонено сканувати" : "дозволено сканувати"}
            </li>
          ))}
        </ul>

        <label className={styles.sfLabel} htmlFor="demo-canonical">
          {"link rel=\"canonical\" href="}
        </label>
        <input
          id="demo-canonical"
          className={`${styles.itInput} ${!canonicalAbsolute ? styles.aeBadBorder : ""}`}
          value={canonical}
          onChange={(event) => setCanonical(event.target.value)}
        />
        <p className={styles.lpHint}>
          {canonicalAbsolute ? "Повний абсолютний URL — коректно." : "Це відносний шлях — пошукова система не зможе однозначно його розпізнати."}
        </p>
      </DemoPreview>

      <DemoExplanation>
        Заміни "Disallow: /admin/" на просто "Disallow: /" (без шляху після слеша) — усі три адреси вище одразу
        стануть забороненими, включно з головною сторінкою "/". Це та сама помилка з lesson dontDoThis, показана
        наживо на реальному парсингу правил.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Вердикти вище — результат справжньої перевірки префіксів Disallow проти кожного шляху, тієї самої логіки,
        яку використовує пошуковий бот. Онови robots.txt як завгодно і побач інший результат негайно.
      </DemoKeyTakeaway>
    </div>
  );
}
