// global-stylesheets-helper.ts
import { CSSResultGroup, LitElement } from "lit";
/**
 * Adds global CSS stylesheets to a component class.
 * Generates an array of CSSStyleSheet objects containing the global styles defined in the document for the given stylesheet names.
 * If no stylesheet names are provided, it returns an array containing all global stylesheets.
 * @param {typeof LitElement} componentClass - The class of the component to add global styles to.
 * @param {string[]} [stylesheetNames] - Optional: An array of stylesheet names to filter for.
 */
export function addGlobalCSSStyleSheets(
  componentClass: typeof LitElement,
  stylesheetNames?: string[],
) {
  // 1. get global StyleSheets
  let globalStyleSheets: CSSStyleSheet[] = Array.from(document.styleSheets).map(
    (documentStyleSheet) => {
      const sheet: CSSStyleSheet = new CSSStyleSheet();
      const css: string = Array.from(documentStyleSheet.cssRules)
        .map((rule) => rule.cssText)
        .join(" ");
      sheet.replaceSync(css);
      return sheet;
    },
  );

  // 2. optionally filter for certain stylesheet names (if provided)
  if (stylesheetNames && stylesheetNames.length > 0) {
    globalStyleSheets = globalStyleSheets.filter((sheet) => {
      return stylesheetNames.some(
        (name) => sheet.href && sheet.href.includes(name),
      );
    });
  }

  // 3. Add the style sheets to Lit Component
  let componentStyleSheets: CSSResultGroup = [];
  if (Array.isArray(componentClass.styles))
    componentStyleSheets = componentClass.styles;
  else if (componentClass.styles)
    componentStyleSheets = [componentClass.styles];
  componentClass.styles = [...globalStyleSheets, ...componentStyleSheets];
}
