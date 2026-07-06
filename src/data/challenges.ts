import type { ChallengeCategory, CodingChallenge } from "../types/platform";

const names = [
  "Написати функцію",
  "Відфільтрувати масив",
  "Перевернути рядок",
  "Побудувати навбар",
  "Адаптивна картка",
  "Центрування div",
  "Акордеон",
  "Модальне вікно",
  "Нескінченний скрол",
  "Пагінація",
  "Логіка списку задач",
  "Перемикач теми",
  "Валідація форми",
  "Лічильник на React",
  "Список задач на React",
  "CRUD на React",
  "Власний хук",
  "Дебаунс",
  "Тротлінг",
  "Проміс",
  "Async/await",
  "Fetch-запит",
  "Мемоізація",
  "Context API",
  "Редʼюсер",
];

const categories: ChallengeCategory[] = ["HTML", "CSS", "JavaScript", "React", "TypeScript"];

export const codingChallenges: CodingChallenge[] = Array.from({ length: 105 }, (_, index) => {
  const title = `${names[index % names.length]} ${Math.floor(index / names.length) + 1}`;
  const difficulty = index % 9 === 0 ? "Hard" : index % 3 === 0 ? "Medium" : "Easy";
  return {
    id: `challenge-${index + 1}`,
    category: categories[index % categories.length],
    title,
    description: `Розвʼяжи фокусоване frontend-завдання: «${title}». Рішення має бути невеликим, читабельним і тестованим.`,
    difficulty,
    xpReward: difficulty === "Hard" ? 90 : difficulty === "Medium" ? 55 : 30,
  };
});
