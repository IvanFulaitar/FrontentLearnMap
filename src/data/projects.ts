import type { ProjectTask } from "../types/platform";

// `slug` stays ASCII so ids/URLs remain stable; `title` is the localized
// display name shown to the learner.
const projectDefs = [
  { slug: "calculator", title: "Калькулятор" },
  { slug: "weather", title: "Погода" },
  { slug: "movie-search", title: "Пошук фільмів" },
  { slug: "admin-dashboard", title: "Адмін-панель" },
  { slug: "kanban", title: "Канбан-дошка" },
  { slug: "chat-ui", title: "Інтерфейс чату" },
  { slug: "expense-tracker", title: "Трекер витрат" },
  { slug: "e-commerce", title: "Інтернет-магазин" },
  { slug: "crypto-dashboard", title: "Крипто-дашборд" },
  { slug: "netflix-clone", title: "Клон Netflix" },
  { slug: "trello-clone", title: "Клон Trello" },
];

export const platformProjects: ProjectTask[] = projectDefs.map(({ slug, title }, index) => ({
  id: slug,
  title,
  difficulty: index < 3 ? "Easy" : index < 8 ? "Medium" : "Hard",
  level: index < 3 ? "Beginner" : index < 8 ? "Intermediate" : "Advanced",
  description: `Створи проєкт «${title}», готовий до портфоліо, з чіткими станами інтерфейсу та багаторазовими компонентами.`,
  requirements: [
    "Адаптивний макет для мобільних, планшетів і десктопу",
    "Доступні елементи керування з видимим станом фокусу",
    "Чиста структура компонентів із багаторазовими UI-частинами",
    "Локальні тестові дані зі станами завантаження, порожнім і помилки",
    "Щонайменше одне задокументоване технічне рішення",
  ],
  expectedResult: `Відшліфований сценарій «${title}», що виглядає як справжня продуктова функція і підходить для показу в портфоліо.`,
  checklist: [
    "Основний користувацький сценарій працює від початку до кінця",
    "Перевірено десктопний і мобільний макети",
    "Додано стани порожнього результату, завантаження та помилки",
    "Навігація з клавіатури працює для інтерактивних елементів",
    "README пояснює налаштування, рішення та компроміси",
  ],
  usefulResources: ["MDN Web Docs", "React Docs", "web.dev", "ARIA Authoring Practices"],
  wireframe: "Верхня навігація → Робоча область → Основний контент → Панель деталей/підсумку → Постійні дії",
  technologies: ["React", "TypeScript", "CSS Modules"],
}));
