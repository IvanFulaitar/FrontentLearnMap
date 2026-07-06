import type { LessonOverride } from "./htmlFoundations";
import { htmlFoundationsOverrides } from "./htmlFoundations";
import { htmlWebBasicsOverrides } from "./htmlWebBasics";
import { htmlTextOverrides } from "./htmlText";
import { htmlNavigationOverrides } from "./htmlNavigation";
import { htmlImagesOverrides } from "./htmlImages";
import { htmlListsOverrides } from "./htmlLists";
import { htmlTablesOverrides } from "./htmlTables";
import { htmlSemanticsOverrides } from "./htmlSemantics";

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
};

export const getLessonOverride = (moduleId: string, title: string): LessonOverride | undefined =>
  lessonOverridesByModule[moduleId]?.[title];
