import {
  isIntentColor,
  isPrimitiveColor,
  isSemanticColor,
} from './color.filter.js';

export default [
  {
    destination: 'colors.primitive.css',
    format: 'css/variables',
    filter: (token) => isPrimitiveColor(token),
    options: {
      outputReferences: true,
    },
  },
  {
    destination: 'colors.semantic.css',
    format: 'css/variables',
    filter: (token) => isSemanticColor(token),
    options: {
      outputReferences: true,
    },
  },

  {
    destination: 'colors.intent.css',
    format: 'css/variables',
    filter: (token) => isIntentColor(token),
    options: {
      outputReferences: true,
    },
  },
];
