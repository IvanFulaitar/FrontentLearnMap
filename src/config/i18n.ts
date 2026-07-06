// The platform is now Ukrainian-only. The previous i18next/react-i18next
// setup was unused everywhere in the app (no component ever called
// `useTranslation()` or `t()`), while most of the UI was still hardcoded in
// English — so the "multi-language" switcher never actually worked. It has
// been removed in favor of a single, fully translated Ukrainian interface.
// This file is intentionally left empty; it is not imported anywhere.
// You can safely delete this file together with the `i18next` and
// `react-i18next` entries in package.json.
export {};
