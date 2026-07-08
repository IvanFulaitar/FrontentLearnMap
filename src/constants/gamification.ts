import type { Achievement, DailyChallenge, LevelDefinition } from "../types/platform";

export const XP_REWARDS = {
  lessonRead: 20,
  quizPassed: 50,
  moduleCompleted: 150,
  courseCompleted: 500,
  projectCompleted: 1000,
  dailyChallenge: 25,
} as const;

export const levels: LevelDefinition[] = [
  { level: 1, title: "Джуніор-початківець", minXp: 0 },
  { level: 2, title: "Учень HTML", minXp: 120 },
  { level: 3, title: "Дослідник CSS", minXp: 280 },
  { level: 4, title: "Студент JavaScript", minXp: 520 },
  { level: 5, title: "Навігатор DOM", minXp: 850 },
  { level: 6, title: "Знавець асинхронності", minXp: 1250 },
  { level: 7, title: "Новачок React", minXp: 1750 },
  { level: 8, title: "Будівник компонентів", minXp: 2350 },
  { level: 9, title: "Практик хуків", minXp: 3050 },
  { level: 10, title: "Спеціаліст з роутингу", minXp: 3850 },
  { level: 11, title: "Розробник TypeScript", minXp: 4750 },
  { level: 12, title: "Інженер типізованого UI", minXp: 5750 },
  { level: 13, title: "Дослідник API", minXp: 6900 },
  { level: 14, title: "Початківець у тестуванні", minXp: 8200 },
  { level: 15, title: "Спеціаліст з продуктивності", minXp: 9700 },
  { level: 16, title: "Архітектор рішень", minXp: 11400 },
  { level: 17, title: "Пілот деплойменту", minXp: 13300 },
  { level: 18, title: "Знавець CI/CD", minXp: 15400 },
  { level: 19, title: "Дослідник просунутих тем", minXp: 17800 },
  { level: 20, title: "Frontend-майстер", minXp: 20500 },
];

export const achievements: Achievement[] = [
  { id: "first-lesson", title: "Перший урок", description: "Заверши свій перший урок.", xpReward: 20 },
  { id: "completed-html", title: "HTML завершено", description: "Заверши курс HTML.", xpReward: 250 },
  { id: "completed-css", title: "CSS завершено", description: "Заверши курс CSS.", xpReward: 250 },
  { id: "ten-tests", title: "10 тестів пройдено", description: "Пройди десять тестів.", xpReward: 300 },
  { id: "fifty-lessons", title: "50 уроків", description: "Заверши п'ятдесят уроків.", xpReward: 500 },
  { id: "hundred-lessons", title: "100 уроків", description: "Заверши сто уроків.", xpReward: 1000 },
  { id: "seven-day-streak", title: "Серія 7 днів", description: "Навчайся сім днів поспіль.", xpReward: 250 },
  { id: "thirty-day-streak", title: "Серія 30 днів", description: "Навчайся тридцять днів поспіль.", xpReward: 900 },
  { id: "first-project", title: "Перший проєкт", description: "Заверши свій перший проєкт.", xpReward: 500 },
  { id: "react-developer", title: "React-розробник", description: "Заверши модулі з React.", xpReward: 600 },
  { id: "typescript-master", title: "Майстер TypeScript", description: "Заверши модулі з TypeScript.", xpReward: 600 },
  { id: "api-explorer", title: "Дослідник API", description: "Заверши завдання, пов'язані з API.", xpReward: 350 },
  { id: "dark-mode-user", title: "Прихильник темної теми", description: "Увімкни й використай темну тему.", xpReward: 50 },
];

export const dailyChallenges: DailyChallenge[] = [
  { id: "daily-lesson", title: "Прочитати урок", description: "Відкрий урок і познач його як «у процесі» або «завершено».", xpReward: 25 },
  { id: "daily-practice", title: "Виконати практику", description: "Попрацюй у пісочниці з кодом над практичним завданням.", xpReward: 35 },
  { id: "daily-quiz", title: "Пройти тест", description: "Заверши будь-який тест із результатом 60%+.", xpReward: 50 },
  { id: "daily-js", title: "Написати 20 рядків JS", description: "Виріши маленьку задачу або допиши логіку компонента.", xpReward: 40 },
];
