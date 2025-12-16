// scripts/generate-typography-tokens.js
// ---------------------------------------------------------
// Generate ALL typography tokens from primitives/font.json
// ---------------------------------------------------------

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateUtopiaScale } from '../src/utils/utopia.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('📟 - __dirname → ', __dirname);

const INPUT_FILE = path.join(
  __dirname,
  '../src/tokens/1 - primitives/font.json'
);
const PRIMITIVES_OUT = path.join(
  __dirname,
  '../src/tokens/1 - primitives/font-scale.json'
);
const SEMANTIC_OUT = path.join(
  __dirname,
  '../src/tokens/2 - semantic/font.json'
);
const COMPONENT_OUT = path.join(__dirname, '../src/tokens/component/font.json');

// -----------------------------------
// Load primitive inputs for typography
// -----------------------------------

if (!fs.existsSync(INPUT_FILE)) {
  process.exit(1);
}

let configToken;
try {
  configToken = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8')).font;
} catch (e) {
  process.exit(1);
}

const config = {
  minFont: configToken.minFont?.value ?? 16,
  maxFont: configToken.maxFont?.value ?? 20,
  minViewport: configToken.minViewport?.value ?? 360,
  maxViewport: configToken.maxViewport?.value ?? 1280,
  scaleMin: configToken.scaleMin?.value ?? 1.2,
  scaleMax: configToken.scaleMax?.value ?? 1.25,
  steps: configToken.steps?.value ?? [0, 1, 2, 3, 4, 5, 6],
};

// -----------------------------------
// Build Utopia scale
// -----------------------------------

const scale = generateUtopiaScale(config);

// -----------------------------------
// Output primitive scale tokens
// -----------------------------------

const primitives = {
  font: {
    scale: Object.fromEntries(
      Object.entries(scale).map(([step, value]) => [step, { value }])
    ),
  },
};

// -----------------------------------
// Define semantic tokens
// -----------------------------------

const semantic = {
  text: {
    body: {
      size: { value: '{font.scale.0}' },
      lineHeight: { value: '1.5' },
      weight: { value: '{font.weight.regular}' },
    },
    caption: {
      size: { value: '{font.scale.-2}' },
      lineHeight: { value: '1.4' },
      weight: { value: '{font.weight.medium}' },
    },
  },
  heading: {
    h1: {
      size: { value: '{font.scale.4}' },
      lineHeight: { value: '1.1' },
      weight: { value: '{font.weight.bold}' },
    },
    h2: {
      size: { value: '{font.scale.3}' },
      lineHeight: { value: '1.15' },
      weight: { value: '{font.weight.bold}' },
    },
  },
};

// -----------------------------------
// Define component tokens
// -----------------------------------

// const component = {
//   component: {
//     button: {
//       label: {
//         size: { value: '{text.body.size}' },
//         lineHeight: { value: '{text.body.lineHeight}' },
//         weight: { value: '{font.weight.medium}' },
//       },
//     },
//     card: {
//       title: {
//         size: { value: '{heading.h2.size}' },
//         lineHeight: { value: '{heading.h2.lineHeight}' },
//       },
//       description: {
//         size: { value: '{text.body.size}' },
//       },
//     },
//   },
// };

// -----------------------------------
// Write JSON files
// -----------------------------------

function writeJSON(file, data) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// writeJSON(PRIMITIVES_OUT, primitives);
// writeJSON(SEMANTIC_OUT, semantic);
// writeJSON(COMPONENT_OUT, component);
