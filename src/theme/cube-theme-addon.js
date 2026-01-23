// // cube-theme-addon.js
// import { generateThemeCubeCSSVariables } from "../cube-css/formatters/cube-css.js";
// import {
//   shouldOutputReferences,
//   rewriteOriginalRefs,
// } from "./formatters/theme-core.js";

// export function cubeThemeAddon({ dictionary, options, scope }) {
//   const privateVar = scope === "private";

//   return dictionary.allTokens
//     .filter((t) => t.attributes?.category === "cube")
//     .map((t) => {
//       // start from your existing cube name rules
//       const entry = generateThemeCubeCSSVariables(t);
//       console.log(
//         "📟 - shouldOutputReferences(t, options, dictionary) → ",
//         shouldOutputReferences(t, options, dictionary),
//       );
//       console.log(
//         "📟 - rewriteOriginalRefs(originalValue, dictionary.tokens, privateVar",
//         rewriteOriginalRefs(t.original?.value, dictionary.tokens, privateVar),
//       );
//       // add refs (optional)
//       const originalValue = t.original?.value;
//       const original = shouldOutputReferences(t, options, dictionary)
//         ? rewriteOriginalRefs(originalValue, dictionary.tokens, privateVar)
//         : null;

//       return {
//         ...entry,
//         original, // lets generateThemeContent prefer original.value
//       };
//     });
// }

// // cube-theme-addon.js
import { generateThemeCubeCSSVariables } from "../cube-css/formatters/cube-css.js";

export function cubeThemeAddon({ dictionary }) {
  return dictionary.allTokens
    .filter((t) => t.attributes?.category === "cube")
    .map((t) => generateThemeCubeCSSVariables(t));
}
