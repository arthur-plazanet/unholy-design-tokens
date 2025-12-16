import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import {
  privateThemeTemplate,
  publicThemeTemplate,
  themeConfig,
} from './theme/index.js';
// import { cubeCssVariablesLayerFormatter } from './cube-css/formatters/cube-css.js';
import { typesDeclarationFormatter2 } from './formatters/type-declarations.js';
import cubeConfig from './cube-css/cube.config.js';
import { generateUtopiaScale } from './utils/utopia.js';
import { spacingFluid } from './formatters/spacing.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import colorConfig from './colors/color.config.js';
import { cubeCssVariablesLayerFormatter } from './cube-css/formatters/cube-css.js';
// import themeConfig from './theme/theme.config.js';

StyleDictionary.registerFormat(typesDeclarationFormatter2);

StyleDictionary.registerTransform(cubeCssVariablesLayerFormatter);

StyleDictionary.registerFormat(publicThemeTemplate);
StyleDictionary.registerFormat(privateThemeTemplate);
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
        if (token.attributes?.type === 'conditional') {
        }

        return token.path[0] === dir || token.attributes?.type === dir;
      },
    };
  });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(
  __dirname,
  '../src/tokens/1-primitives/typography.json'
);
const PRIMITIVES_OUT = path.join(
  __dirname,
  '../src/tokens/1-primitives/font-scale.json'
);
const SEMANTIC_OUT = path.join(
  __dirname,
  '../src/tokens/2-semantic/typography.json'
);
const COMPONENT_OUT = path.join(
  __dirname,
  '../src/tokens/component/typography.json'
);

// // 1) register an action
StyleDictionary.registerAction({
  name: 'generate-utopia-typography',
  do: () => {
    if (!fs.existsSync(INPUT_FILE)) {
      process.exit(1);
    }

    const source = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8')).primitives
      .typographyConfig;

    const config = {
      minFont: source.minFont?.value ?? 16,
      maxFont: source.maxFont?.value ?? 20,
      minViewport: source.minViewport?.value ?? 360,
      maxViewport: source.maxViewport?.value ?? 1280,
      scaleMin: source.scaleMin?.value ?? 1.2,
      scaleMax: source.scaleMax?.value ?? 1.25,
      steps: source.steps?.value ?? [-2, -1, 0, 1, 2, 3, 4],
    };

    const scale = generateUtopiaScale(config);

    const primitives = {
      primitives: {
        font: {
          scale: Object.fromEntries(
            Object.entries(scale).map(([step, value]) => [step, { value }])
          ),
        },
      },
    };

    const semantic = {
      semantic: {
        text: {
          body: {
            size: { value: '{primitives.font.scale.0}' },
            lineHeight: { value: '1.5' },
            weight: { value: '{primitives.font.weight.regular}' },
          },
          caption: {
            size: { value: '{primitives.font.scale.-2}' },
            lineHeight: { value: '1.4' },
            weight: { value: '{primitives.font.weight.medium}' },
          },
        },
        heading: {
          h1: {
            size: { value: '{primitives.font.scale.4}' },
            lineHeight: { value: '1.1' },
            weight: { value: '{primitives.font.weight.bold}' },
          },
          h2: {
            size: { value: '{primitives.font.scale.3}' },
            lineHeight: { value: '1.15' },
            weight: { value: '{primitives.font.weight.bold}' },
          },
        },
      },
    };

    const component = {
      component: {
        button: {
          label: {
            size: { value: '{semantic.text.body.size}' },
            lineHeight: { value: '{semantic.text.body.lineHeight}' },
            weight: { value: '{primitives.font.weight.medium}' },
          },
        },
        card: {
          title: {
            size: { value: '{semantic.heading.h2.size}' },
            lineHeight: { value: '{semantic.heading.h2.lineHeight}' },
          },
          description: {
            size: { value: '{semantic.text.body.size}' },
          },
        },
      },
    };

    const writeJSON = (file, data) => {
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
    };

    // writeJSON(PRIMITIVES_OUT, primitives);
    // writeJSON(SEMANTIC_OUT, semantic);
    // writeJSON(COMPONENT_OUT, component);
  },
  undo: () => {
    // optional: clean files if you want
  },
});

export default {
  parser: 'initial-theme-parser',
  source: ['src/tokens/**/*.json'],
  // action: ['generate-utopia-typography'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        // 'color/hue',
        // 'color/saturation',
        // 'color/lightness',
        // 'attribute/cti', // pick up category/type/item
        // 'color/hsl',
        // 'custom/component-state',
      ],
      buildPath: './build/css/',
      clearBuildPath: true,
      outputReferences: true,

      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          filter: (token) => {
            return token.attributes.category === 'typography';
          },
          actions: ['generate-utopia-typography'], // <- here
          options: {
            outputReferences: true,
          },
        },

        {
          destination: 'conditional.css',
          format: formats.cssVariables,
          filter: (token) => token.attributes?.type === 'conditional',
          options: {
            outputReferences: true,
          },
        },
        ...themeConfig,
        {
          destination: 'spacing.css',
          format: 'css/spacing-fluid',
          filter: (token) => {
            return (
              token.attributes?.category === 'spacing' ||
              token.attributes?.type === 'spacing'
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
          destination: 'variants.css',
          format: formats.cssVariables,
          filter: (token) => {
            const variants = ['variant', 'state', 'typography', 'border'];
            return variants.includes(token.attributes?.category);
          },
          options: {
            fileHeader: (defaultMessage) => {
              return [...defaultMessage, 'Variant tokens'];
            },
            outputReferences: true,
          },
        },
        // ...colorConfig,
        // ...cubeConfig,

        ...generateThemeFiles(['component', 'font']),
      ],
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
  },
};
