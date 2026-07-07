import type { LearningResource, ResourceCategory } from "../types/platform";
import { resourceCategoryLabels } from "../constants/labels";

const categories: ResourceCategory[] = ["Official Docs", "Videos", "Articles", "YouTube", "GitHub", "Cheat Sheets", "Practice Sites"];

export const resources: LearningResource[] = categories.flatMap((category, index) => {
  const categoryLabel = resourceCategoryLabels[category].toLowerCase();
  return [
    {
      id: `${category.toLowerCase().replace(/ /g, "-")}-core`,
      category,
      title: `${resourceCategoryLabels[category]}: основи frontend`,
      description: `Добірка ресурсів типу «${categoryLabel}» для вивчення frontend-розробки.`,
      url: index % 2 === 0 ? "https://developer.mozilla.org/" : "https://web.dev/learn/",
      tags: ["frontend", "навчання", category],
    },
    {
      id: `${category.toLowerCase().replace(/ /g, "-")}-react`,
      category,
      title: `${resourceCategoryLabels[category]}: напрямок React`,
      description: `Корисні ресурси типу «${categoryLabel}» для React, TypeScript та UI-розробки.`,
      url: "https://react.dev/",
      tags: ["react", "typescript", category],
    },
  ];
});
