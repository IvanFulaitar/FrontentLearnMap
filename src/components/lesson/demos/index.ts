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
import { LineHeightDemo } from "./LineHeightDemo";
import { TextStylingDemo } from "./TextStylingDemo";
import { SystemThemeDemo } from "./SystemThemeDemo";
import { TransitionHoverDemo } from "./TransitionHoverDemo";
import { KeyframeDemo } from "./KeyframeDemo";
import { ReducedMotionDemo } from "./ReducedMotionDemo";
import { CssModulesDemo } from "./CssModulesDemo";
import { ConditionalClassesDemo } from "./ConditionalClassesDemo";
import { NamingApproachDemo } from "./NamingApproachDemo";
import { LandingPreviewDemo } from "./LandingPreviewDemo";
import { A11yAuditDemo } from "./A11yAuditDemo";
import { RequestCycleDemo } from "./RequestCycleDemo";
import { ClientServerDemo } from "./ClientServerDemo";
import { RenderPipelineDemo } from "./RenderPipelineDemo";
import { DomTreeDemo } from "./DomTreeDemo";
import { DocAnatomyDemo } from "./DocAnatomyDemo";
import { ViewportMetaDemo } from "./ViewportMetaDemo";
import { HeadingHierarchyDemo } from "./HeadingHierarchyDemo";
import { SemanticTextDemo } from "./SemanticTextDemo";
import { UrlAnatomyDemo } from "./UrlAnatomyDemo";
import { SpecialLinksDemo } from "./SpecialLinksDemo";
import { AltTextDemo } from "./AltTextDemo";
import { ResponsiveImageDemo } from "./ResponsiveImageDemo";
import { ListSemanticsDemo } from "./ListSemanticsDemo";
import { NestedListDemo } from "./NestedListDemo";
import { TableSemanticsDemo } from "./TableSemanticsDemo";
import { AccessibleTableDemo } from "./AccessibleTableDemo";
import { ArticleSectionAsideDemo } from "./ArticleSectionAsideDemo";
import { FigureDetailsDialogDemo } from "./FigureDetailsDialogDemo";
import { ButtonVsLinkDemo } from "./ButtonVsLinkDemo";
import { VariableStateDemo } from "./VariableStateDemo";
import { NullishVsOrDemo } from "./NullishVsOrDemo";
import { TypeCoercionDemo } from "./TypeCoercionDemo";
import { TemplateLiteralDemo } from "./TemplateLiteralDemo";
import { DevToolsSimulatorDemo } from "./DevToolsSimulatorDemo";
import { IfElseDemo } from "./IfElseDemo";
import { SwitchDemo } from "./SwitchDemo";
import { TruthyFalsyDemo } from "./TruthyFalsyDemo";
import { LoopDemo } from "./LoopDemo";
import { GuardClauseDemo } from "./GuardClauseDemo";
import { ErrorHandlingDemo } from "./ErrorHandlingDemo";
import { FunctionHoistingDemo } from "./FunctionHoistingDemo";
import { ArrowThisDemo } from "./ArrowThisDemo";
import { DefaultParamsDemo } from "./DefaultParamsDemo";
import { ReturnValueDemo } from "./ReturnValueDemo";
import { ClosureScopeDemo } from "./ClosureScopeDemo";
import { PureFunctionDemo } from "./PureFunctionDemo";
import { ArrayAccessDemo } from "./ArrayAccessDemo";
import { MapRenderDemo } from "./MapRenderDemo";
import { FilterSearchDemo } from "./FilterSearchDemo";
import { ReduceTotalsDemo } from "./ReduceTotalsDemo";
import { SortDemo } from "./SortDemo";
import { ImmutableUpdateDemo } from "./ImmutableUpdateDemo";
import { ObjectLiteralDemo } from "./ObjectLiteralDemo";
import { PropertyAccessDemo } from "./PropertyAccessDemo";
import { DestructuringDemo } from "./DestructuringDemo";
import { ObjectSpreadDemo } from "./ObjectSpreadDemo";
import { NestedDataDemo } from "./NestedDataDemo";
import { ObjectMethodsDemo } from "./ObjectMethodsDemo";

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
  "line-height-demo": LineHeightDemo,
  "text-styling-demo": TextStylingDemo,
  "system-theme-demo": SystemThemeDemo,
  "transition-hover-demo": TransitionHoverDemo,
  "keyframe-demo": KeyframeDemo,
  "reduced-motion-demo": ReducedMotionDemo,
  "css-modules-demo": CssModulesDemo,
  "conditional-classes-demo": ConditionalClassesDemo,
  "naming-approach-demo": NamingApproachDemo,
  "landing-preview-demo": LandingPreviewDemo,
  "a11y-audit-demo": A11yAuditDemo,
  "request-cycle-demo": RequestCycleDemo,
  "client-server-demo": ClientServerDemo,
  "render-pipeline-demo": RenderPipelineDemo,
  "dom-tree-demo": DomTreeDemo,
  "doc-anatomy-demo": DocAnatomyDemo,
  "viewport-meta-demo": ViewportMetaDemo,
  "heading-hierarchy-demo": HeadingHierarchyDemo,
  "semantic-text-demo": SemanticTextDemo,
  "url-anatomy-demo": UrlAnatomyDemo,
  "special-links-demo": SpecialLinksDemo,
  "alt-text-demo": AltTextDemo,
  "responsive-image-demo": ResponsiveImageDemo,
  "list-semantics-demo": ListSemanticsDemo,
  "nested-list-demo": NestedListDemo,
  "table-semantics-demo": TableSemanticsDemo,
  "accessible-table-demo": AccessibleTableDemo,
  "article-section-aside-demo": ArticleSectionAsideDemo,
  "figure-details-dialog-demo": FigureDetailsDialogDemo,
  "button-vs-link-demo": ButtonVsLinkDemo,
  "variable-state-demo": VariableStateDemo,
  "nullish-vs-or-demo": NullishVsOrDemo,
  "type-coercion-demo": TypeCoercionDemo,
  "template-literal-demo": TemplateLiteralDemo,
  "devtools-simulator-demo": DevToolsSimulatorDemo,
  "if-else-demo": IfElseDemo,
  "switch-demo": SwitchDemo,
  "truthy-falsy-demo": TruthyFalsyDemo,
  "loop-demo": LoopDemo,
  "guard-clause-demo": GuardClauseDemo,
  "error-handling-demo": ErrorHandlingDemo,
  "function-hoisting-demo": FunctionHoistingDemo,
  "arrow-this-demo": ArrowThisDemo,
  "default-params-demo": DefaultParamsDemo,
  "return-value-demo": ReturnValueDemo,
  "scope-closures-demo": ClosureScopeDemo,
  "pure-function-demo": PureFunctionDemo,
  "array-access-demo": ArrayAccessDemo,
  "map-render-demo": MapRenderDemo,
  "filter-search-demo": FilterSearchDemo,
  "reduce-totals-demo": ReduceTotalsDemo,
  "sort-demo": SortDemo,
  "immutable-update-demo": ImmutableUpdateDemo,
  "object-literal-demo": ObjectLiteralDemo,
  "property-access-demo": PropertyAccessDemo,
  "destructuring-demo": DestructuringDemo,
  "object-spread-demo": ObjectSpreadDemo,
  "nested-data-demo": NestedDataDemo,
  "object-methods-demo": ObjectMethodsDemo,
};
