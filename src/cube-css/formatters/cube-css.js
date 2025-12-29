import { generateHeader } from "../../utils/template.js";
import { toKebab } from "../../utils/helpers.js";

/**
 * Build public/private CSS var names from tokens.
 *
 * Rules:
 * - For "normal" tokens (color, border, space, etc.), keep:
 *     --{type}-{item}[-{subitem}]
 *   e.g. --border-width-default, --space-md
 *
 * - For cube tokens (category: "cube"):
 *   - type = "block", "composition", "utility", ...
 *   - item = e.g. "card", "stack", "cluster"
 *   - subitem = e.g. "background", "borderColor", "gap"
 *
 *   Option A mapping:
 *   - block/card/background  → --block-card-background
 *   - composition/stack/gap  → --stack-gap
 *   - utility/spacing/mt-0   → --utility-spacing-mt-0
 *
 */
export function generateThemeCubeCSS(tokens) {
  return tokens
    .filter((p) => p.attributes?.category === "cube")
    .map((p) => {
      return generateThemeCubeCSSVariables(p);
    });
}

export function generateThemeCubeCSSVariables(token) {
  const p = token;
  const attrs = p.attributes || {};
  const path = p.path || [];

  let publicName;

  const item = attrs.item || path[1] || "default";
  const subitem = attrs.subitem;

  // const base = subitem
  //   ? `${type}-${item}-${subitem}`
  //   : `${type}-${item}-${subitem ? subitem : ""}`.replace(/-$/, "");

  const base = subitem
    ? `${item}-${subitem}`
    : `${item}-${subitem ? subitem : ""}`.replace(/-$/, "");

  publicName = `--${toKebab(base)}`;

  const privateName = publicName.replace(/^--/, "--_");

  return {
    publicName,
    privateName,
    value: p.value,
    category: attrs.category,
    type: attrs.type,
  };
}

/**
 * CUBE: Utility → @layer utilities
 * Generate utility classes from tokens.
 */
export const cubeUtilityFormatter = {
  name: "cube/utility",
  format: ({ dictionary }) => {
    let content = "";
    const usedItems = new Set();
    dictionary.allTokens.forEach((token) => {
      const item = token.attributes?.item;
      if (item && !usedItems.has(item)) {
        usedItems.add(item);
        content += generateHeader(item);
      }
      content += generateCubeUtilityClass(token);
    });
    return content;
  },
};

export function generateCubeUtilityClass(token) {
  // fallback for other cube types, e.g. utility/spacing/mt-0 → --utility-spacing-mt-0
  const attrs = token.attributes || {};
  const path = token.path || [];
  const item = attrs.item || path[1] || "";
  let className = "";

  const hideItems = ["display"];

  if (!hideItems.includes(item)) {
    className = `${item}-`;
  } else {
    className = ``;
  }

  const subitem = attrs.subitem ? `${attrs.subitem}` : "";
  const state = attrs.state ? `-${attrs.state}` : "";
  className = `${className}${subitem}${state}`;
  className = `.${toKebab(className)}`;

  const classCssContent = `${token.value}`;

  return `${className} { ${classCssContent} } \n`;
}
