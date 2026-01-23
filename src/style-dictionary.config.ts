import StyleDictionary, { Token } from 'style-dictionary'
import { formats, transformGroups } from 'style-dictionary/enums'
// @ts-expect-error - JS module without type declarations
import { themeConfig } from './theme/index.js'
// import { cubeCssVariablesLayerFormatter } from './cube-css/formatters/cube-css.js';
import cubeConfig from './cube-css/cube.config.js'
// @ts-expect-error - JS module without type declarations
import { spacingFluid } from './formatters/spacing.js'
import { tokensDeclarationFormatter, typesDeclarationFormatter } from './formatters/type-declarations.js'
// import "./theme/formatters/theme.format.js"; // your file shown above (theme formats)

import colorConfig from './colors/color.config.js'
// import themeConfig from './theme/theme.config.js';

StyleDictionary.registerFormat(tokensDeclarationFormatter)


StyleDictionary.registerFormat(typesDeclarationFormatter)


// StyleDictionary.registerFormat(publicThemeTemplate);
// StyleDictionary.registerFormat(privateThemeTemplate);
StyleDictionary.registerFormat(spacingFluid)
// StyleDictionary.registerFormat(cubeCssVariablesLayerFormatter);

function generateThemeFiles(directories: string[]) {
  const genericAttributes = {
    format: formats.cssVariables,
    options: {
      // outputReferences: true,
    },
  }
  return directories.map((dir) => {
    return {
      ...genericAttributes,
      // output the dironent tokens in the right folder and file e.g. dironents/button/button-vars.css
      destination: `${dir}/${dir}.css`,
      format: formats.cssVariables,
      // only include the tokens that are inside this dironent token group
      filter: (token: Token) => {
        return token.path[0] === dir || token.attributes?.type === dir
      },
    }
  })
}

StyleDictionary.registerFormat({
  name: 'conditional-css',
  format: function ({ dictionary }) {
    let output = `:root {\n`
    output += dictionary.allTokens
      .map((token) => {
        const { type } = token.attributes || {}
        return `  --${type}: ${token.value};`
      })
      .join('\n')
    output += `\n}\n`
    return output
  },
})

export default {
  // parser: 'initial-theme-parser',
  source: ['src/tokens/**/*.json'],
  // action: ['generate-utopia-typography'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        'attribute/cti', // pick up category/type/item
      ],
      buildPath: 'css/',
      clearBuildPath: true,
      outputReferences: true,

      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: (token: Token) => {
            return token.attributes?.category === 'typography'
          },
          actions: ['generate-utopia-typography'], // <- here
          options: {
            outputReferences: true,
          },
        },
        {
          destination: 'conditional.css',
          filter: (token: Token) => token.attributes?.category === 'conditional',
          format: 'conditional-css',
          transformGroup: 'css',
          options: {
            outputReferences: true,
          },
        },
        ...themeConfig,
        {
          destination: 'space.css',
          // format: "css/spacing-fluid",
          format: formats.cssVariables,
          filter: (token: Token) => {
            return token.attributes?.category === 'space' || token.attributes?.type === 'space'
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
        //     fileHeader: (defaultMessage: string[]) => {
        //       return [...defaultMessage, 'Variant tokens']
        //     },
        //   },
        // },
        {
          destination: 'variants.css',
          format: formats.cssVariables,
          filter: (token: Token) => {
            const variants = ['variant', 'state', 'color']
            const category: string | undefined = token.attributes?.category as string
            return (
              variants.includes(category) &&
              token.attributes?.tokenTier !== 'intent' &&
              token.attributes?.tokenTier !== 'semantic' &&
              token.attributes?.tokenTier !== 'primitive'
            )
          },
          options: {
            fileHeader: (defaultMessage: string[]) => {
              return [...defaultMessage, 'Variant tokens']
            },
            outputReferences: true,
          },
        },
        ...colorConfig,
        ...cubeConfig,
        ...generateThemeFiles(['components', 'font', 'bg', 'border', 'text', 'variant']),
      ],
    },
    // Type declarations
    ts: {
      // transformGroup: "js",
      // transformGroup: "js",
      buildPath: 'types/',
      files: [
        {
          destination: 'theme.d.ts',
          format: 'typescript/types-declaration',
          transformGroup: 'js',
        },
      ],
    },
    // Tokens declarations
    tokens: {
      // transformGroup: "js",
      transformGroup: 'css',
      buildPath: 'types/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/tokens-declaration',
        },
      ],
    },
  },
}
