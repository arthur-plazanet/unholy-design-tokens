import { generateFluidSpaceUnit } from "../../formatters/spacing.js";
import { usesReferences, getReferences } from "style-dictionary/utils";
import {
  generateSectionHeader,
  generateSubheader,
} from "../../utils/template.js";
import {
  generateThemeCubeCSS,
  generateThemeCubeCSSVariables,
} from "../../cube-css/formatters/cube-css.js";
import {
  themeSubHeader,
  generateThemeContent,
  themeSectionHeader,
} from "./helper.js";
const toKebab = (s) => s.replace(/_/g, "-").replace(/\./g, "-");

// Collect tokens into { publicName, value } entries
function collectTokens(dictionary) {
  const allTokens = dictionary.allTokens;

  const cubeTokens = generateThemeCubeCSS(allTokens);

  const rest = allTokens
    .filter((p) => p.attributes?.category !== "cube")
    .map((p) => {
      // Build a public CSS var name like --text-md, --space-lg, etc.
      // based on CTI (category/type/item) when available, else path.
      // if (p.attributes?.category === "cube") {
      //   console.log("📟 - p (cube) → ", p);
      //   return generateThemeCubeCSSVariables(p);
      // }
      const path = p.attributes?.item
        ? [p.attributes.category, p.attributes.type, p.attributes.item]
        : p.path;

      let name = path.category
        ? `${path.category}-${path.type}-${path.item}`
        : path.join("-");
      // if (path.type === 'border') {
      // }
      return {
        publicName: `--${toKebab(name)}`,
        privateName: `--_${toKebab(name)}`,
        value: p.value,
        category: p.attributes?.category,
      };
    });

  return [...rest, ...cubeTokens];
}

export const publicThemeTemplate = {
  name: "public-theme",
  format: ({ dictionary, options }) => {
    const { outputReferences } = options || {};

    const toks = collectTokens(dictionary);
    let header = `/**
 * Theme Overrides
 * List of CSS variables that can be used to override the default theme
 * Simply uncomment the variables you want to use
 */`;
    let content = `${header}\n:root {`;

    content += generateThemeContent(toks);
    content += "\n}\n";
    return content;

    // const body = toks.map((t) => `  /* ${t.publicName}: ${t.value}; */`).join('\n')
    // return `${header}\n${body}\n}\n`
  },
};

export const privateThemeTemplate = {
  name: "private-theme",
  format: ({ dictionary }) => {
    const toks = collectTokens(dictionary);
    let header = `/**
 * Internal default theme variables
 * Using CSS pseudo-private custom properties 
 * https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/
 */`;
    let content = `${header}\n:root {`;

    content += generateThemeContent(toks, "private");
    content += "\n}\n";
    return content;
    // const body = toks.map((t) => `  ${t.privateName}: var(${t.publicName}, ${t.value});`).join('\n')
    // return `${header}\n${body}\n}\n`
  },
};
