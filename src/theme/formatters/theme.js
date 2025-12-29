import { usesReferences, getReferences } from "style-dictionary/utils";
import { generateThemeCubeCSS } from "../../cube-css/formatters/cube-css.js";
import { generateThemeContent } from "./helper.js";
import StyleDictionary from "style-dictionary";
const toKebab = (s) => s.replace(/_/g, "-").replace(/\./g, "-");

// Collect tokens into { publicName, value } entries
function collectTokens(tokens, options = {}) {
  const cubeTokens = generateThemeCubeCSS(tokens);
  const { outputReferences } = options;

  const rest = tokens
    .filter((p) => p.attributes?.category !== "cube")
    .map((p) => {
      // Build a public CSS var name like --text-md, --space-lg, etc.
      // based on CTI (category/type/item) when available, else path.
      // if (p.attributes?.category === "cube") {
      //   console.log("📟 - p (cube) → ", p);
      //   return generateThemeCubeCSSVariables(p);
      let value = p.value;
      const originalValue = p.original.value;
      // }
      const shouldOutputRef =
        usesReferences(originalValue) &&
        (typeof outputReferences === "function"
          ? outputReferences(p)
          : outputReferences);
      const path = p.attributes?.item
        ? [p.attributes.category, p.attributes.type, p.attributes.item]
        : p.path;

      let name = path.category
        ? `${path.category}-${path.type}-${path.item}`
        : path.join("-");
      // if (path.type === 'border') {
      // }
      let isEntirelyRef = false;
      if (shouldOutputRef) {
        // Note: make sure to use `originalValue` because
        // `token.value` is already resolved at this point.
        const refs = getReferences(originalValue, tokens);
        isEntirelyRef = refs.length === 1 && refs[0].value === value;
        refs.forEach((ref) => {
          // wrap in template literal ${} braces if the value is more than just entirely a reference
          value = value.replace(
            ref.value,
            isEntirelyRef ? ref.name : `\${${ref.name}}`,
          );
        });
      }

      value = shouldOutputRef && !isEntirelyRef ? `\`${value}\`` : value;
      return {
        publicName: `--${toKebab(name)}`,
        privateName: `--_${toKebab(name)}`,
        value,
        category: p.attributes?.category,
      };
    });

  return [...rest, ...cubeTokens];
}

StyleDictionary.registerFormat({
  name: "public-theme",
  format: ({ dictionary, options }) => {

    const toks = collectTokens(dictionary.allTokens, options);
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
});

StyleDictionary.registerFormat({
  name: "private-theme",
  format: ({ dictionary, options }) => {

    const toks = collectTokens(dictionary.allTokens, options);
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
});
