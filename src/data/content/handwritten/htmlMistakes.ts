import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Типові помилки початківців" (html-mistakes). Cheat-sheet format.
 * One consolidated reference lesson — a scannable "sins list" pulling
 * together the single worst mistake from every earlier module, so it can
 * be reviewed in under 5 minutes before an interview or code review.
 */
export const htmlMistakesOverrides: Record<string, LessonOverride> = {
  "Найпоширеніші помилки початківців в HTML": {
    whatIsIt: "Це не нова тема — це шпаргалка з 10 помилок, які початківці роблять найчастіше, зібраних з усього курсу в одному місці для швидкого повторення.",
    whyUseIt: "Перед код-рев'ю чи співбесідою немає часу перечитувати 20 уроків — цей список можна проглянути за хвилину й одразу впізнати свої звички.",
    whenToUse: ["Перед тим, як здати тестове завдання чи проєкт.", "Перед співбесідою, де запитують про HTML.", "Під час рев'ю чужого коду — швидкий чек-лист, на що дивитись."],
    whenNotToUse: [],
    comparisonTable: {
      headers: ["❌ Помилка", "✅ Правильно"],
      rows: [
        ["<div onclick>", "<button> або <a href>"],
        ["placeholder замість label", "<label for=\"...\">"],
        ["img без alt", "img alt=\"опис\""],
        ["Два h1 на сторінці", "Один h1, далі h2/h3..."],
        ["<table> для верстки макета", "CSS Grid/Flexbox"],
        ["Список через <br>", "<ul>/<ol> з <li>"],
        ["target=\"_blank\" без rel", "rel=\"noopener noreferrer\""],
        ["outline: none без заміни", "Власний видимий :focus стиль"],
        ["robots.txt з Disallow: /", "Дозволити індексацію потрібних сторінок"],
        ["og:image відносним шляхом", "Повний URL з https://"],
      ],
    },
    dontDoThis: {
      code: `<div onclick="submit()">Надіслати</div>
<input type="text" placeholder="Email" />
<img src="cake.jpg">
<h1>Заголовок 1</h1>
<h1>Заголовок 2</h1>`,
      explanation: "П'ять типових помилок в п'яти рядках: div замість button, placeholder замість label, відсутній alt, два h1. Кожна окремо здається дрібницею — разом вони роблять сторінку непрацездатною для частини користувачів.",
    },
    commonMistakes: ["div/span замість button/a для інтерактивних елементів.", "placeholder як єдина підказка для поля форми.", "Відсутній або формальний (\"картинка\") alt.", "Кілька h1 на сторінці.", "table для верстки макета, а не даних."],
    bestPractices: ["Проходь цей список як чек-лист перед кожним pull request.", "Якщо сумніваєшся в тезі зі списку — знайди відповідний урок курсу й повтори whatIsIt/whyUseIt."],
    remember: ["Кожна помилка зі списку ламає доступність, SEO чи підтримку коду.", "Список — не для запам'ятовування напам'ять, а для швидкої звірки.", "Одна маленька помилка (немає alt, немає label) впливає на реальних людей, які нею користуються."],
    interviewQuestions: [{ question: "Назви три найпоширеніші помилки в HTML, які ти бачив у чужому коді.", answer: "Приклад відповіді: div замість button для кліків, placeholder замість label у формах, відсутній alt на зображеннях — усі три ламають доступність без зміни зовнішнього вигляду." }],
    summary: "10 помилок, зібраних з усього курсу, в одній таблиці. Проглядай перед рев'ю коду чи співбесідою — це швидше, ніж перечитувати уроки заново.",
    nextLessonNote: "Далі — 6 міні-проєктів, щоб застосувати все вивчене самостійно, без підказок з café-проєкту.",
    microExercises: [
      { id: "html-mistakes-sort", kind: "find-the-bug", prompt: "Знайди всі помилки:\n\n<div onclick=\"go()\">Меню</div>\n<input placeholder=\"Ім'я\">\n<img src=\"a.jpg\">", solution: "div замість a/button для навігації, placeholder замість label, відсутній alt на img — три окремі помилки." },
    ],
  },
};
