import StyleDictionary from "style-dictionary";
import { formats, transformGroups } from "style-dictionary/enums";
import {
  themeConfig,
  // privateThemeTemplate,
  // publicThemeTemplate,
} from "./theme/index.js";
// import { cubeCssVariablesLayerFormatter } from './cube-css/formatters/cube-css.js';
import { typesDeclarationFormatter2 } from "./formatters/type-declarations.js";
import cubeConfig from "./cube-css/cube.config.js";
import { spacingFluid } from "./formatters/spacing.js";
import colorConfig from "./colors/color.config.js";
// import themeConfig from './theme/theme.config.js';

StyleDictionary.registerFormat(typesDeclarationFormatter2);

// StyleDictionary.registerFormat(publicThemeTemplate);
// StyleDictionary.registerFormat(privateThemeTemplate);
StyleDictionary.registerFormat(spacingFluid);
// StyleDictionary.registerFormat(cubeCssVariablesLayerFormatter);

function generateThemeFiles(directories) {
  const genericAttributes = {
    format: formats.cssVariables,
    options: {
      // outputReferences: true,
    },
  };
  return directories.map((dir) => {
    return {
      ...genericAttributes,
      // output the dironent tokens in the right folder and file e.g. dironents/button/button-vars.css
      destination: `${dir}/${dir}.css`,
      format: formats.cssVariables,
      // only include the tokens that are inside this dironent token group
      filter: (token) => {
        return token.path[0] === dir || token.attributes?.type === dir;
      },
    };
  });
}

StyleDictionary.registerFormat({
  name: "conditional-css",
  format: function ({ dictionary }) {
    let output = `:root {\n`;
    output += dictionary.allTokens
      .map((token) => {
        const { type } = token.attributes || {};
        return `  --${type}: ${token.value};`;
      })
      .join("\n");
    output += `\n}\n`;
    return output;
  },
});

export default {
  // parser: 'initial-theme-parser',
  source: ["src/tokens/**/*.json"],
  // action: ['generate-utopia-typography'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        "attribute/cti", // pick up category/type/item
      ],
      buildPath: "css/",
      clearBuildPath: true,
      outputReferences: true,

      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          filter: (token) => {
            return token.attributes.category === "typography";
          },
          actions: ["generate-utopia-typography"], // <- here
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "conditional.css",
          filter: (token) => token.attributes?.category === "conditional",
          format: "conditional-css",
          transformGroup: "css",
          options: {
            outputReferences: true,
          },
        },
        ...themeConfig,
        {
          destination: "spacing.css",
          format: "css/spacing-fluid",
          filter: (token) => {
            return (
              token.attributes?.category === "spacing" ||
              token.attributes?.type === "spacing"
            );
          },
          options: {
            outputReferences: true,
          },
        },
        // -------------------------------------------------------
        /**
         * OKlch tokens
         */
        // {
        //   destination: 'primitives.css',
        //   format: formats.cssVariables,
        //   filter: (token) => {
        //     return token.attributes?.type === 'primitive'
        //   },
        // },
        // {
        //   destination: 'variant.css',
        //   format: formats.cssVariables,
        //   filter: (token) => {
        //     return token.attributes?.category === 'variant'
        //   },
        //   options: {
        //     fileHeader: (defaultMessage) => {
        //       return [...defaultMessage, 'Variant tokens']
        //     },
        //   },
        // },
        {
          destination: "variants.css",
          format: formats.cssVariables,
          filter: (token) => {
            const variants = ["variant", "state", "typography", "border"];
            return variants.includes(token.attributes?.category);
          },
          options: {
            fileHeader: (defaultMessage) => {
              return [...defaultMessage, "Variant tokens"];
            },
            outputReferences: true,
          },
        },
        ...colorConfig,
        ...cubeConfig,
        ...generateThemeFiles(["components", "font"]),
      ],
    },
    // Type declarations
    ts: {
      transformGroup: "js",
      buildPath: "types/",
      files: [
        {
          destination: "theme.d.ts",
          format: "typescript/types-declaration",
        },
        {
          format: "typescript/module-declarations",
          destination: "colors.d.ts",
        },
      ],
    },
  },
};
