import { usesReferences, getReferences } from "style-dictionary/utils";

export const themeTypesFormatter = {
  name: "typescript/theme-declarations",
  format: function ({ dictionary }) {
    const props = dictionary.allTokens;
    const types = props.map((token) => `${token.name}: string;`).join("\n");

    return `export interface YThemeToken {\n${types}\n}\n`;
  },
};

const toKebab = (s) =>
  s
    .replace(/_/g, "-")
    .replace(/\./g, "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
 *   Private vars are the same but prefixed with "--_".
 */
export const cubeCssVariablesLayerFormatter = {
  name: "cube/css-variables-layer",
  format: ({ dictionary, options }) => {
    const toks = [];
    dictionary.allTokens.forEach((p) => {
      console.log("📟 - p → ", p);
      const attrs = p.attributes || {};
      console.log("📟 - attrs → ", attrs);
      const path = p.path || [];

      let publicName;

      if (attrs.category === "cube") {
        const area = attrs.type; // "block", "composition", "utility", ...
        const element = attrs.item; // "card", "stack", "cluster", ...
        const prop =
          attrs.subitem || attrs.state || attrs.role || path[3] || null;

        if (area === "block") {
          // block/card/background → --block-card-background
          if (prop) {
            publicName = `--block-${toKebab(element)}-${toKebab(prop)}`;
          } else {
            publicName = `--block-${toKebab(element)}`;
          }
        } else if (area === "composition") {
          // composition/stack/gap → --stack-gap
          // composition/cluster/gap → --cluster-gap
          if (prop) {
            publicName = `--${toKebab(element)}-${toKebab(prop)}`;
          } else {
            publicName = `--${toKebab(element)}`;
          }
        } else {
          // fallback for other cube types, e.g. utility/spacing/mt-0 → --utility-spacing-mt-0
          if (prop) {
            publicName = `--${toKebab(area)}-${toKebab(element)}-${toKebab(
              prop,
            )}`;
          } else {
            publicName = `--${toKebab(area)}-${toKebab(element)}`;
          }
        }
      } else {
        // Non-cube tokens: keep the original type-item-subitem pattern
        const type = attrs.type || path[0];
        const item = attrs.item || path[1] || "default";
        const subitem = attrs.subitem;

        const base = subitem
          ? `${item}-${subitem}`
          : `${item}-${subitem ? subitem : ""}`.replace(/-$/, "");

        publicName = `--${toKebab(base)}`;
      }

      const privateName = publicName.replace(/^--/, "--_");

      toks.push({
        publicName,
        privateName,
        value: p.value,
        type: attrs.type,
      });
    });
    return toks;
  },
};

export function generateThemeCubeCSSVariables(token) {
  const p = token;
  console.log("📟 - p → ", p);
  const attrs = p.attributes || {};
  console.log("📟 - attrs → ", attrs);
  const path = p.path || [];

  let publicName;

  // if (attrs.category === 'cube') {
  const area = attrs.type; // "block", "composition", "utility", ...
  const element = attrs.item; // "card", "stack", "cluster", ...
  const prop = attrs.subitem || attrs.state || attrs.role || path[3] || null;

  // if (area === 'block') {
  //   // block/card/background → --block-card-background
  //   if (prop) {
  //     publicName = `--block-${toKebab(element)}-${toKebab(prop)}`;
  //   } else {
  //     publicName = `--block-${toKebab(element)}`;
  //   }
  // } else if (area === 'composition') {
  //   // composition/stack/gap → --stack-gap
  //   // composition/cluster/gap → --cluster-gap
  //   if (prop) {
  //     publicName = `--${toKebab(element)}-${toKebab(prop)}`;
  //   } else {
  //     publicName = `--${toKebab(element)}`;
  //   }
  // } else {
  //   // fallback for other cube types, e.g. utility/spacing/mt-0 → --utility-spacing-mt-0
  //   if (prop) {
  //     publicName = `--${toKebab(area)}-${toKebab(element)}-${toKebab(
  //       prop
  //     )}`;
  //   } else {
  //     publicName = `--${toKebab(area)}-${toKebab(element)}`;
  //   }
  // }
  // } else {
  // Non-cube tokens: keep the original type-item-subitem pattern
  const type = attrs.type || path[0];
  const item = attrs.item || path[1] || "default";
  const subitem = attrs.subitem;

  const base = subitem
    ? `${item}-${subitem}`
    : `${item}-${subitem ? subitem : ""}`.replace(/-$/, "");

  publicName = `--${toKebab(base)}`;
  // }

  const privateName = publicName.replace(/^--/, "--_");

  return {
    publicName,
    privateName,
    value: p.value,
    category: attrs.category,
    type: attrs.type,
  };
}

export function generateThemeCubeCSS(tokens) {
  console.log("📟 - tokens → ", tokens);
  const toks = [];
  return tokens
    .filter((p) => p.attributes?.category === "cube")
    .map((p) => {
      console.log("📟 - p → ", p);
      return generateThemeCubeCSSVariables(p);
    });
}
