import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import {
  filterThemeTokens,
  privateThemeTemplate,
  publicThemeTemplate,
} from './formatters/theme/theme.js';
import { cubeCssVariablesLayerFormatter } from './formatters/cube-css.js';
import { parseInitialTheme } from './parsers/initial-theme-parser.js';
import { componentStatesTransform } from './transforms/component-states.js';
import { typesDeclarationFormatter2 } from './formatters/type-declarations.js';
import cube from './config/cube.js';

StyleDictionary.registerParser(parseInitialTheme);

StyleDictionary.registerFormat(typesDeclarationFormatter2);
StyleDictionary.registerTransform(componentStatesTransform);

StyleDictionary.registerFormat(publicThemeTemplate);
StyleDictionary.registerFormat(privateThemeTemplate);
StyleDictionary.registerFormat(cubeCssVariablesLayerFormatter);

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
        if (token.attributes.type === 'conditional') {
        }

        return token.path[0] === dir || token.attributes.type === dir;
      },
    };
  });
}

export default {
  parser: 'initial-theme-parser',
  source: ['src/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        // 'color/hue',
        // 'color/saturation',
        // 'color/lightness',
        'attribute/cti', // pick up category/type/item
        // 'color/hsl',
        // 'custom/component-state',
      ],
      buildPath: './build/css/',
      clearBuildPath: true,
      outputReferences: true,

      files: [
        {
          destination: 'conditional.css',
          format: formats.cssVariables,
          filter: (token) => filterThemeTokens(token),
        },
        {
          destination: 'themes/private-theme.css',
          format: 'private-theme',
          filter: (token) => filterThemeTokens(token),
          options: {
            outputReferences: true,
          },
        },
        {
          destination: 'themes/public-theme.css',
          format: 'public-theme',
          filter: (token) => filterThemeTokens(token),
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
          destination: 'variants.css',
          format: formats.cssVariables,
          filter: (token) => {
            const variants = ['variant', 'state', 'color'];
            return variants.includes(token.attributes?.category);
          },
          options: {
            fileHeader: (defaultMessage) => {
              return [...defaultMessage, 'Variant tokens'];
            },
            outputReferences: true,

          },
        },
        ...generateThemeFiles(['component']),
      ],
    },

    cube,
  },
  // Type declarations
  ts: {
    transformGroup: 'js',
    buildPath: 'build/types/',
    files: [
      {
        destination: 'theme.d.ts',
        format: 'typescript/types-declaration',
      },
      {
        format: 'typescript/module-declarations',
        destination: 'colors.d.ts',
      },
    ],
  },
};
