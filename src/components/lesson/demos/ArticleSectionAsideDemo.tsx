import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Tag = "article" | "section" | "aside";

type Scenario = {
  id: string;
  toolbarLabel: string;
  heading: string;
  body: string;
  correct: Tag;
  why: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "product-card",
    toolbarLabel: "Картка товару",
    heading: "Капучино",
    body: "55 грн. З молочною пінкою.",
    correct: "article",
    why: "Картку товару можна винести на окрему сторінку (наприклад, сторінку товару) — вона самодостатня, тому це article.",
  },
  {
    id: "menu-group",
    toolbarLabel: "Блок «Меню»",
    heading: "Меню",
    body: "Кілька товарів об'єднано під спільним заголовком «Меню».",
    correct: "section",
    why: "Це тематична група контенту зі своїм заголовком, але сама вона не самодостатня поза сторінкою — тому section, а не article.",
  },
  {
    id: "sidebar-ad",
    toolbarLabel: "Бічна реклама",
    heading: "Рекомендуємо також",
    body: "Знижка 10% на десерти цього тижня.",
    correct: "aside",
    why: "Це побічний контент, не головний матеріал сторінки — типовий приклад aside.",
  },
];

const TAGS: { value: Tag; label: string }[] = [
  { value: "article", label: "<article>" },
  { value: "section", label: "<section>" },
  { value: "aside", label: "<aside>" },
];

/**
 * Live demo for "Article, section і aside": pick a real content example,
 * then guess which semantic tag fits it. The rendered preview looks
 * IDENTICAL no matter which tag is chosen — that's the whole point: the
 * difference between these tags is invisible visually and only matters to
 * search engines and screen readers, so guessing by appearance never works.
 */
export function ArticleSectionAsideDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, Tag | undefined>>({});
  const scenario = SCENARIOS[scenarioIndex];
  const guess = guesses[scenario.id];

  function handleScenarioChange(value: string) {
    const index = SCENARIOS.findIndex((s) => s.id === value);
    setScenarioIndex(index === -1 ? 0 : index);
  }

  function handleGuess(tag: Tag) {
    setGuesses((prev) => ({ ...prev, [scenario.id]: tag }));
  }

  const isCorrect = guess === scenario.correct;
  const tagName = guess ?? "???";

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={SCENARIOS.map((s) => ({ value: s.id, label: s.toolbarLabel }))}
        value={scenario.id}
        onChange={handleScenarioChange}
      />

      <DemoPreview label="Виглядає однаково незалежно від тегу">
        <div className={styles.semanticBlock}>
          <h3>{scenario.heading}</h3>
          <p>{scenario.body}</p>
        </div>
      </DemoPreview>

      <div className={styles.tagGuessRow}>
        {TAGS.map((t) => (
          <button
            key={t.value}
            type="button"
            className={`${styles.tagGuessButton} ${
              guess === t.value ? (t.value === scenario.correct ? styles.tagGuessCorrect : styles.tagGuessWrong) : ""
            }`}
            onClick={() => handleGuess(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {guess ? (
        <DemoExplanation>
          {isCorrect ? "✅ Правильно. " : `❌ Насправді тут потрібен <${scenario.correct}>. `}
          {scenario.why}
        </DemoExplanation>
      ) : (
        <DemoExplanation>Клікни на один з тегів вище, щоб перевірити свою здогадку.</DemoExplanation>
      )}

      <DemoCodeSnippet code={`<${tagName}>\n  <h3>${scenario.heading}</h3>\n  <p>${scenario.body}</p>\n</${tagName}>`} />

      <DemoKeyTakeaway>
        Прев'ю вище не змінюється, який би тег ти не обрав, — article/section/aside не мають власного вигляду за
        замовчуванням. Різниця живе лише в семантиці: що зрозуміє пошуковик і скрінрідер, а не що побачить око.
      </DemoKeyTakeaway>
    </div>
  );
}
