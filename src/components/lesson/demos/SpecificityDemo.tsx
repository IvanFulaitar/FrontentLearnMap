import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Matchup = "tag-vs-class" | "class-vs-id" | "one-class-vs-two" | "id-vs-important";

interface MatchupConfig {
  label: string;
  ruleA: { selector: string; score: string; color: string };
  ruleB: { selector: string; score: string; color: string };
  winner: "A" | "B";
  note: string;
}

const MATCHUPS: Record<Matchup, MatchupConfig> = {
  "tag-vs-class": {
    label: "тег проти класу",
    ruleA: { selector: "h2", score: "0-0-1", color: "#1f2937" },
    ruleB: { selector: ".menu-heading", score: "0-1-0", color: "#c2410c" },
    winner: "B",
    note: "Клас (0-1-0) важчий за тег (0-0-1) — .menu-heading перемагає, навіть якщо написаний вище в файлі.",
  },
  "class-vs-id": {
    label: "клас проти id",
    ruleA: { selector: ".title", score: "0-1-0", color: "#c2410c" },
    ruleB: { selector: "#hero-title", score: "1-0-0", color: "#1d4ed8" },
    winner: "B",
    note: "id (1-0-0) важчий за будь-яку кількість класів на цьому рівні — #hero-title перемагає.",
  },
  "one-class-vs-two": {
    label: "1 клас проти 2 класів у селекторі",
    ruleA: { selector: ".title", score: "0-1-0", color: "#c2410c" },
    ruleB: { selector: ".card .title", score: "0-2-0", color: "#15803d" },
    winner: "B",
    note: "Два класи в селекторі (0-2-0) важчі за один (0-1-0) — .card .title перемагає.",
  },
  "id-vs-important": {
    label: "id проти !important",
    ruleA: { selector: "#main-text", score: "1-0-0", color: "#1d4ed8" },
    ruleB: { selector: "p (з !important)", score: "!important", color: "#dc2626" },
    winner: "B",
    note: "!important перебиває звичайну специфічність практично завжди — навіть id програє.",
  },
};

/**
 * Live demo for "Селектори та специфічність": click a matchup in the
 * toolbar to see two real, competing CSS rules applied to the same
 * element — the winning color is computed live from actual specificity
 * scores, not just described in text.
 */
export function SpecificityDemo() {
  const [matchup, setMatchup] = useState<Matchup>("tag-vs-class");
  const config = MATCHUPS[matchup];
  const winnerRule = config.winner === "A" ? config.ruleA : config.ruleB;
  const loserRule = config.winner === "A" ? config.ruleB : config.ruleA;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={Object.entries(MATCHUPS).map(([value, cfg]) => ({ value, label: cfg.label }))}
        value={matchup}
        onChange={(value) => setMatchup(value as Matchup)}
      />

      <DemoPreview label="Обидва правила діють на той самий елемент — колір показує, яке реально перемогло">
        <div className={styles.spStage}>
          <div className={styles.spRule}>
            <code>{config.ruleA.selector}</code>
            <span className={styles.spScore}>{config.ruleA.score}</span>
          </div>
          <div className={styles.spRule}>
            <code>{config.ruleB.selector}</code>
            <span className={styles.spScore}>{config.ruleB.score}</span>
          </div>
          <div className={styles.spResult} style={{ color: winnerRule.color }}>
            Кав'ярня «Аромат»
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>{config.note}</DemoExplanation>

      <DemoCodeSnippet
        code={`${config.ruleA.selector} { color: ${config.ruleA.color}; }
${config.ruleB.selector} { color: ${config.ruleB.color}; }

/* переможе: ${winnerRule.selector} (специфічність ${winnerRule.score}) */
/* програє: ${loserRule.selector} (специфічність ${loserRule.score}) */`}
      />

      <DemoKeyTakeaway>
        Специфічність рахується як три (чи чотири, разом з !important) окремі розряди: id, клас/атрибут/псевдоклас,
        тег. Порядок у файлі вирішує лише тоді, коли всі розряди обох селекторів рівні — інакше завжди перемагає
        конкретніший селектор.
      </DemoKeyTakeaway>
    </div>
  );
}
