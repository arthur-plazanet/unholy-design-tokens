import {
  isIntentColor,
  isPrimitiveColor,
  isSemanticColor,
} from "./color.filter.js";
import {} from "./color.formatter.js";

export default [
  {
    destination: "colors.primitive.css",
    transformGroup: "css",
    // format: "format/color",
    format: "css/variables",
    filter: (token) => isPrimitiveColor(token),
    options: {
      outputReferences: true,
      fileHeader: (defaultMessage) => {
        return ["Collection name: Color Primitives", "Mode: Light"];
      },
    },
  },
  {
    destination: "colors.semantic.css",
    transformGroup: "css",
    format: "css/variables",
    filter: (token) => isSemanticColor(token),
    options: {
      outputReferences: true,
      fileHeader: (defaultMessage) => {
        return ["Collection name: Color Semantics", "Mode: Light"];
      },
    },
  },

  {
    destination: "colors.intent.css",
    transformGroup: "css",
    format: "css/variables",
    filter: (token) => isIntentColor(token),
    options: {
      outputReferences: true,
      fileHeader: (defaultMessage) => {
        return ["Collection name: Color Intents", "Mode: Light"];
      },
    },
  },
];
