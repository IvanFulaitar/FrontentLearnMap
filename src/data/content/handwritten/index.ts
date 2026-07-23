import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";
import { htmlFoundationsOverrides, htmlFoundationsModuleQuiz } from "./htmlFoundations";
import { htmlWebBasicsOverrides, htmlWebBasicsModuleQuiz } from "./htmlWebBasics";
import { htmlTextOverrides, htmlTextModuleQuiz } from "./htmlText";
import { htmlNavigationOverrides, htmlNavigationModuleQuiz } from "./htmlNavigation";
import { htmlImagesOverrides, htmlImagesModuleQuiz } from "./htmlImages";
import { htmlListsOverrides, htmlListsModuleQuiz } from "./htmlLists";
import { htmlTablesOverrides, htmlTablesModuleQuiz } from "./htmlTables";
import { htmlSemanticsOverrides, htmlSemanticsModuleQuiz } from "./htmlSemantics";
import { htmlFormsOverrides, htmlFormsModuleQuiz } from "./htmlForms";
import { htmlAccessibilityOverrides, htmlAccessibilityModuleQuiz } from "./htmlAccessibility";
import { htmlSeoOverrides, htmlSeoModuleQuiz } from "./htmlSeo";
import { htmlRealComponentsOverrides, htmlRealComponentsModuleQuiz } from "./htmlRealComponents";
import { htmlThinkingOverrides, htmlThinkingModuleQuiz } from "./htmlThinking";
import { htmlMistakesOverrides, htmlMistakesModuleQuiz } from "./htmlMistakes";
import { htmlMiniProjectsOverrides, htmlMiniProjectsModuleQuiz } from "./htmlMiniProjects";
import { cssFoundationsOverrides, cssFoundationsModuleQuiz } from "./cssFoundations";
import { cssBoxModelOverrides, cssBoxModelModuleQuiz } from "./cssBoxModel";
import { cssTypographyOverrides, cssTypographyModuleQuiz } from "./cssTypography";
import { cssFlexboxOverrides, cssFlexboxModuleQuiz } from "./cssFlexbox";
import { cssGridOverrides, cssGridModuleQuiz } from "./cssGrid";
import { cssRealHeaderHeroOverrides, cssRealHeaderHeroModuleQuiz } from "./cssRealHeaderHero";
import { cssRealButtonsCardsOverrides, cssRealButtonsCardsModuleQuiz } from "./cssRealButtonsCards";
import { cssRealFormsPricingOverrides, cssRealFormsPricingModuleQuiz } from "./cssRealFormsPricing";
import { cssResponsiveOverrides, cssResponsiveModuleQuiz } from "./cssResponsive";
import { cssVariablesDarkModeOverrides, cssVariablesDarkModeModuleQuiz } from "./cssVariablesDarkMode";
import { cssAnimationsOverrides, cssAnimationsModuleQuiz } from "./cssAnimations";
import { cssArchitectureReactOverrides } from "./cssArchitectureReact";
import { cssFinalProjectOverrides } from "./cssFinalProject";
import { jsLanguageBasicsOverrides } from "./jsLanguageBasics";
import { jsControlFlowOverrides } from "./jsControlFlow";
import { jsFunctionsOverrides } from "./jsFunctions";
import { jsArraysOverrides } from "./jsArrays";
import { jsObjectsOverrides } from "./jsObjects";
import { jsDomOverrides } from "./jsDom";
import { jsEventsOverrides } from "./jsEvents";
import { jsAsyncOverrides } from "./jsAsync";
import { jsNetworkStorageOverrides } from "./jsNetworkStorage";
import { jsAppPatternsOverrides } from "./jsAppPatterns";
import { vscodeSetupOverrides, vscodeSetupModuleQuiz } from "./vscodeSetup";
import { tsBasicsOverrides } from "./tsBasics";
import { tsObjectsOverrides } from "./tsObjects";
import { tsFunctionsOverrides } from "./tsFunctions";
import { tsGenericsOverrides } from "./tsGenerics";
import { tsReactOverrides } from "./tsReact";

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
  "vscode-setup-basics": vscodeSetupOverrides,
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
  "js-language-basics": jsLanguageBasicsOverrides,
  "js-control-flow": jsControlFlowOverrides,
  "js-functions": jsFunctionsOverrides,
  "js-arrays": jsArraysOverrides,
  "js-objects": jsObjectsOverrides,
  "js-dom": jsDomOverrides,
  "js-events": jsEventsOverrides,
  "js-async": jsAsyncOverrides,
  "js-network-storage": jsNetworkStorageOverrides,
  "js-app-patterns": jsAppPatternsOverrides,
  "ts-basics": tsBasicsOverrides,
  "ts-objects": tsObjectsOverrides,
  "ts-functions": tsFunctionsOverrides,
  "ts-generics": tsGenericsOverrides,
  "ts-react": tsReactOverrides,
};

export const getLessonOverride = (moduleId: string, title: string): LessonOverride | undefined =>
  lessonOverridesByModule[moduleId]?.[title];

/**
 * Hand-written replacements for the generated per-module "контрольний тест"
 * (`makeModuleQuiz` in courses.ts), keyed by module id. Same idea as lesson
 * overrides: the generated quiz was a content-free template ("Яке твердження
 * найкраще описує модуль...", options like "Це важливо лише для
 * backend-систем") that never actually tested what the module taught.
 * Rewriting these is a module-by-module effort — a module with no entry
 * here still falls back to the generated quiz in `makeModule`.
 */
const moduleQuizOverrides: Record<string, QuizData> = {
  "html-web-basics": htmlWebBasicsModuleQuiz,
  "html-foundations": htmlFoundationsModuleQuiz,
  "html-text": htmlTextModuleQuiz,
  "html-navigation": htmlNavigationModuleQuiz,
  "html-images": htmlImagesModuleQuiz,
  "html-lists": htmlListsModuleQuiz,
  "html-tables": htmlTablesModuleQuiz,
  "html-semantics": htmlSemanticsModuleQuiz,
  "html-forms": htmlFormsModuleQuiz,
  "html-accessibility": htmlAccessibilityModuleQuiz,
  "html-seo": htmlSeoModuleQuiz,
  "vscode-setup-basics": vscodeSetupModuleQuiz,
  "html-real-components": htmlRealComponentsModuleQuiz,
  "html-thinking": htmlThinkingModuleQuiz,
  "html-mistakes": htmlMistakesModuleQuiz,
  "html-mini-projects": htmlMiniProjectsModuleQuiz,
  "css-foundations": cssFoundationsModuleQuiz,
  "css-box-model": cssBoxModelModuleQuiz,
  "css-typography": cssTypographyModuleQuiz,
  "css-flexbox": cssFlexboxModuleQuiz,
  "css-grid": cssGridModuleQuiz,
  "css-real-header-hero": cssRealHeaderHeroModuleQuiz,
  "css-real-buttons-cards": cssRealButtonsCardsModuleQuiz,
  "css-real-forms-pricing": cssRealFormsPricingModuleQuiz,
  "css-responsive": cssResponsiveModuleQuiz,
  "css-variables-dark-mode": cssVariablesDarkModeModuleQuiz,
  "css-animations": cssAnimationsModuleQuiz,
};

export const getModuleQuizOverride = (moduleId: string): QuizData | undefined => moduleQuizOverrides[moduleId];
