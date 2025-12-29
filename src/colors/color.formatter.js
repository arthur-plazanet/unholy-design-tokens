import StyleDictionary from "style-dictionary";
import {
  formatInLayer,
  generateFigmaHeaderReference,
} from "../utils/template.js";
import { capitalizeFirstLetter } from "../utils/helpers.js";
import { usesReferences, getReferences } from "style-dictionary/utils";

// const cubeCssLayerFormatter = (children) => {
//   const layerName = "cube";
//   // const selector = ':root';
//   // if file exists, append to it

//   return `@layer ${layerName} {\n  ${children}\n  }\n`;
// };

StyleDictionary.registerFormat({
  name: "format/color",
  format: ({ dictionary, options }) => {
    // Get color tier from first token
    // e.g. 'primitive', 'semantic', 'intent'
    const colorTier = dictionary.allTokens[0].attributes.tokenTier;

    const { usesDtcg, outputReferences } = options;
    console.log("📟 - outputReferences → ", outputReferences);
    let content = "";
    const header = generateFigmaHeaderReference(
      `Color ${capitalizeFirstLetter(colorTier)}`,
      options?.fileHeader?.mode || "Light",
    );
    dictionary.allTokens.forEach((token) => {
      let value = JSON.stringify(token.value);
      const originalValue = token.original.value;
      console.log("📟 - originalValue → ", originalValue);
      // the `dictionary` object now has `usesReferences()` and
      // `getReferences()` methods. `usesReferences()` will return true if
      // the value has a reference in it. `getReferences()` will return
      // an array of references to the whole tokens so that you can access their
      // names or any other attributes.
      const shouldOutputRef = outputReferences && usesReferences(originalValue);
      console.log("📟 - shouldOutputRef → ", shouldOutputRef);

      console.log(
        "📟 - usesReferences(originalValue) → ",
        usesReferences(originalValue),
      );
      console.log("📟 - token → ", options.outputReferences);

      if (shouldOutputRef) {
        // Note: make sure to use `originalValue` because
        // `token.value` is already resolved at this point.
        const refs = getReferences(originalValue, dictionary.tokens);
        console.log("📟 - refs → ", refs);
        let isEntirelyRef = refs.length === 1 && refs[0].value === value;
        refs.forEach((ref) => {
          value = value.replace(
            `{${ref.path.join(".")}}`,
            `var(--${ref.name})`,
          );
        });
        content += `--${token.name}: ${value};\n`;
      }
      content += `--${token.name}: ${token.value};\n`;
      // if the value is not entirely a reference, we have to wrap in template literals
      // return `export const ${token.name} = ${
      //   shouldOutputRef && !isEntirelyRef ? `\`${value}\`` : value
      // };`;
      // content += `    --${token.name}: ${shouldOutputRef && !isEntirelyRef ? `\`${value}\`` : value};\n`;
    });
    return `${header}\n:root {\n${content}}`;

    // wrap in layer
    // return formatInLayer("color", `${header}\n${content}`);
  },
});
