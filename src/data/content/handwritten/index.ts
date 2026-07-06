import type { LessonOverride } from "./htmlFoundations";
import { htmlFoundationsOverrides } from "./htmlFoundations";
import { htmlWebBasicsOverrides } from "./htmlWebBasics";
import { htmlTextOverrides } from "./htmlText";
import { htmlNavigationOverrides } from "./htmlNavigation";
import { htmlImagesOverrides } from "./htmlImages";
import { htmlListsOverrides } from "./htmlLists";
import { htmlTablesOverrides } from "./htmlTables";
import { htmlSemanticsOverrides } from "./htmlSemantics";
import { htmlFormsOverrides } from "./htmlForms";
import { htmlAccessibilityOverrides } from "./htmlAccessibility";
import { htmlSeoOverrides } from "./htmlSeo";
import { htmlRealComponentsOverrides } from "./htmlRealComponents";
import { htmlThinkingOverrides } from "./htmlThinking";
import { htmlMistakesOverrides } from "./htmlMistakes";
import { htmlMiniProjectsOverrides } from "./htmlMiniProjects";
import { cssFoundationsOverrides } from "./cssFoundations";
import { cssBoxModelOverrides } from "./cssBoxModel";
import { cssTypographyOverrides } from "./cssTypography";
import { cssFlexboxOverrides } from "./cssFlexbox";
import { cssGridOverrides } from "./cssGrid";
import { cssRealHeaderHeroOverrides } from "./cssRealHeaderHero";
import { cssRealButtonsCardsOverrides } from "./cssRealButtonsCards";
import { cssRealFormsPricingOverrides } from "./cssRealFormsPricing";
import { cssResponsiveOverrides } from "./cssResponsive";
import { cssVariablesDarkModeOverrides } from "./cssVariablesDarkMode";
import { cssAnimationsOverrides } from "./cssAnimations";
import { cssArchitectureReactOverrides } from "./cssArchitectureReact";
import { cssFinalProjectOverrides } from "./cssFinalProject";

/**
 * Registry of fully hand-authored lesson content, keyed by
 * `${moduleId}::${lessonTitle}`. `courses.ts` checks this map for every
 * generated lesson and, when a match exists, merges the hand-written fields
 * on top of the generated ones (hand-written always wins).
 *
 * To hand-write another module: add a new file next to this one exporting a
 * `Record<string, LessonOverride>` keyed by exact lesson title, then spread
 * it into `lessonOverridesByModule` below with its module id.
 */
const lessonOverridesByModule: Record<string, Record<string, LessonOverride>> = {
  "html-web-basics": htmlWebBasicsOverrides,
  "html-foundations": htmlFoundationsOverrides,
  "html-text": htmlTextOverrides,
  "html-navigation": htmlNavigationOverrides,
  "html-images": htmlImagesOverrides,
  "html-lists": htmlListsOverrides,
  "html-tables": htmlTablesOverrides,
  "html-semantics": htmlSemanticsOverrides,
  "html-forms": htmlFormsOverrides,
  "html-accessibility": htmlAccessibilityOverrides,
  "html-seo": htmlSeoOverrides,
  "html-real-components": htmlRealComponentsOverrides,
  "html-thinking": htmlThinkingOverrides,
  "html-mistakes": htmlMistakesOverrides,
  "html-mini-projects": htmlMiniProjectsOverrides,
  "css-foundations": cssFoundationsOverrides,
  "css-box-model": cssBoxModelOverrides,
  "css-typography": cssTypographyOverrides,
  "css-flexbox": cssFlexboxOverrides,
  "css-grid": cssGridOverrides,
  "css-real-header-hero": cssRealHeaderHeroOverrides,
  "css-real-buttons-cards": cssRealButtonsCardsOverrides,
  "css-real-forms-pricing": cssRealFormsPricingOverrides,
  "css-responsive": cssResponsiveOverrides,
  "css-variables-dark-mode": cssVariablesDarkModeOverrides,
  "css-animations": cssAnimationsOverrides,
  "css-architecture-react": cssArchitectureReactOverrides,
  "css-final-project": cssFinalProjectOverrides,
};

export const getLessonOverride = (moduleId: string, title: string): LessonOverride | undefined =>
  lessonOverridesByModule[moduleId]?.[title];
