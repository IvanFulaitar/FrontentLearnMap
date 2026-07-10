import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Choice = "link" | "button";

type Scenario = {
  id: string;
  label: string;
  correct: Choice;
  why: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "contacts",
    label: "Перейти на сторінку «Контакти»",
    correct: "link",
    why: "URL зміниться на іншу сторінку — це навігація, отже <a href>.",
  },
  {
    id: "cart",
    label: "Додати товар у кошик",
    correct: "button",
    why: "Адреса сторінки не змінюється, виконується дія — отже <button>.",
  },
  {
    id: "theme",
    label: "Перемкнути темну/світлу тему",
    correct: "button",
    why: "Перемикач стану на тій самій сторінці, без переходу — <button>.",
  },
  {
    id: "menu-pdf",
    label: "Відкрити PDF меню в новій вкладці",
    correct: "link",
    why: "Це перехід до іншого ресурсу (файлу) — <a href>, навіть якщо відкривається в новій вкладці.",
  },
];

/**
 * Live demo for "Семантичні кнопки проти посилань": pick whether each
 * real-world action should be a link or a button, then see the actual
 * rendered element behave accordingly — the link genuinely points at a real
 * href, the button genuinely performs an in-place action (a visible cart
 * counter), so the difference is felt, not just read about.
 */
export function ButtonVsLinkDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [guesses, setGuesses] = useState<Record<string, Choice | undefined>>({});
  const [cartCount, setCartCount] = useState(0);
  const scenario = SCENARIOS[scenarioIndex];
  const guess = guesses[scenario.id];

  function handleScenarioChange(value: string) {
    const index = SCENARIOS.findIndex((s) => s.id === value);
    setScenarioIndex(index === -1 ? 0 : index);
  }

  function handleGuess(choice: Choice) {
    setGuesses((prev) => ({ ...prev, [scenario.id]: choice }));
  }

  const isCorrect = guess === scenario.correct;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={SCENARIOS.map((s) => ({ value: s.id, label: s.label }))}
        value={scenario.id}
        onChange={handleScenarioChange}
      />

      <div className={styles.tagGuessRow}>
        <button
          type="button"
          className={`${styles.tagGuessButton} ${
            guess === "link" ? (scenario.correct === "link" ? styles.tagGuessCorrect : styles.tagGuessWrong) : ""
          }`}
          onClick={() => handleGuess("link")}
        >
          {"<a href>"}
        </button>
        <button
          type="button"
          className={`${styles.tagGuessButton} ${
            guess === "button" ? (scenario.correct === "button" ? styles.tagGuessCorrect : styles.tagGuessWrong) : ""
          }`}
          onClick={() => handleGuess("button")}
        >
          {"<button>"}
        </button>
      </div>

      <DemoPreview label="Реальний елемент, побудований за твоїм вибором">
        {guess === "link" ? (
          <a href={scenario.id === "menu-pdf" ? "#menu-pdf-preview" : "#contacts"} className={styles.specialLinkButton}>
            {scenario.label}
          </a>
        ) : null}
        {guess === "button" ? (
          <button
            type="button"
            className={styles.specialLinkButton}
            onClick={() => scenario.id === "cart" && setCartCount((c) => c + 1)}
          >
            {scenario.label}
            {scenario.id === "cart" ? ` (${cartCount})` : ""}
          </button>
        ) : null}
        {!guess ? <p className={styles.headingAnnounce}>Обери варіант вище, щоб побачити його тут.</p> : null}
      </DemoPreview>

      {guess ? (
        <DemoExplanation>
          {isCorrect ? "✅ Правильно. " : `❌ Тут краще підійшов би ${scenario.correct === "link" ? "<a href>" : "<button>"}. `}
          {scenario.why}
        </DemoExplanation>
      ) : (
        <DemoExplanation>URL сторінки зміниться після кліку? Якщо так — посилання, якщо ні — кнопка.</DemoExplanation>
      )}

      <DemoCodeSnippet
        code={
          guess === "link"
            ? `<a href="...">${scenario.label}</a>`
            : guess === "button"
              ? `<button type="button">${scenario.label}</button>`
              : "// обери варіант вище"
        }
      />

      <DemoKeyTakeaway>
        Обери кнопку для дії "Додати в кошик" і клікай кілька разів — рахунок зростає прямо тут, без переходу на нову
        сторінку. У цьому й полягає відмінність: посилання веде кудись, кнопка щось робить на місці.
      </DemoKeyTakeaway>
    </div>
  );
}
