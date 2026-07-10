import type { ComponentType } from "react";
import { FlexboxDemo } from "./FlexboxDemo";
import { GridDemo } from "./GridDemo";
import { BoxModelDemo } from "./BoxModelDemo";
import { DisplayDemo } from "./DisplayDemo";
import { TypographyDemo } from "./TypographyDemo";
import { CssVariablesDemo } from "./CssVariablesDemo";
import { MarginPaddingDemo } from "./MarginPaddingDemo";
import { CssAppliedDemo } from "./CssAppliedDemo";
import { LayerSwitcherDemo } from "./LayerSwitcherDemo";
import { LandmarksHighlightDemo } from "./LandmarksHighlightDemo";
import { HeaderHeroDemo } from "./HeaderHeroDemo";
import { ButtonsCardsDemo } from "./ButtonsCardsDemo";
import { FormsPricingDemo } from "./FormsPricingDemo";
import { ThemeSwitchDemo } from "./ThemeSwitchDemo";
import { PriceCardsDemo } from "./PriceCardsDemo";
import { ShadowsRadiusDemo } from "./ShadowsRadiusDemo";
import { MenuCardsDemo } from "./MenuCardsDemo";
import { PseudoElementsDemo } from "./PseudoElementsDemo";
import { FlexWrapGapDemo } from "./FlexWrapGapDemo";
import { FlexNavDemo } from "./FlexNavDemo";
import { SpecificityDemo } from "./SpecificityDemo";
import { CascadeInheritanceDemo } from "./CascadeInheritanceDemo";
import { UnitsDemo } from "./UnitsDemo";
import { GridAutoFitDemo } from "./GridAutoFitDemo";
import { GridGalleryDemo } from "./GridGalleryDemo";
import { FieldStylingDemo } from "./FieldStylingDemo";
import { FooterGridDemo } from "./FooterGridDemo";
import { MobileMenuDemo } from "./MobileMenuDemo";
import { HeroLayoutDemo } from "./HeroLayoutDemo";
import { ObjectFitBackgroundDemo } from "./ObjectFitBackgroundDemo";
import { ResponsiveGridDemo } from "./ResponsiveGridDemo";
import { ContainerQueryDemo } from "./ContainerQueryDemo";
import { ClampMinMaxDemo } from "./ClampMinMaxDemo";

/**
 * Registry of interactive lesson demos, keyed by the id set on
 * `lesson.interactiveDemo`. Each entry is a real, state-driven React
 * component built from the shared framework (`./framework`) — students
 * change controls and see the actual browser result update live, never a
 * static image or illustration.
 *
 * To add a new demo: create a component next to this file composing
 * `./framework` primitives (DemoSection, DemoControls, DemoPreview,
 * DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoAxis,
 * DemoBeforeAfter, DemoHighlight, DemoViewport, DemoToolbar,
 * DemoColorInput) for a consistent look, register it here under a new id,
 * then set `interactiveDemo: "<id>"` on the lesson override that should
 * show it. The same demo id can be reused across multiple lessons in a
 * module (e.g. all 3 Flexbox lessons share "flexbox-demo").
 */
export const lessonDemos: Record<string, ComponentType> = {
  "flexbox-demo": FlexboxDemo,
  "grid-demo": GridDemo,
  "box-model-demo": BoxModelDemo,
  "display-demo": DisplayDemo,
  "typography-demo": TypographyDemo,
  "css-variables-demo": CssVariablesDemo,
  "margin-padding-demo": MarginPaddingDemo,
  "css-applied-demo": CssAppliedDemo,
  "layer-switcher-demo": LayerSwitcherDemo,
  "landmarks-highlight-demo": LandmarksHighlightDemo,
  "header-hero-demo": HeaderHeroDemo,
  "buttons-cards-demo": ButtonsCardsDemo,
  "forms-pricing-demo": FormsPricingDemo,
  "theme-switch-demo": ThemeSwitchDemo,
  "price-cards-demo": PriceCardsDemo,
  "shadows-radius-demo": ShadowsRadiusDemo,
  "menu-cards-demo": MenuCardsDemo,
  "pseudo-elements-demo": PseudoElementsDemo,
  "flex-wrap-gap-demo": FlexWrapGapDemo,
  "flex-nav-demo": FlexNavDemo,
  "specificity-demo": SpecificityDemo,
  "cascade-inheritance-demo": CascadeInheritanceDemo,
  "units-demo": UnitsDemo,
  "grid-autofit-demo": GridAutoFitDemo,
  "grid-gallery-demo": GridGalleryDemo,
  "field-styling-demo": FieldStylingDemo,
  "footer-grid-demo": FooterGridDemo,
  "mobile-menu-demo": MobileMenuDemo,
  "hero-layout-demo": HeroLayoutDemo,
  "object-fit-background-demo": ObjectFitBackgroundDemo,
  "responsive-grid-demo": ResponsiveGridDemo,
  "container-query-demo": ContainerQueryDemo,
  "clamp-min-max-demo": ClampMinMaxDemo,
};
