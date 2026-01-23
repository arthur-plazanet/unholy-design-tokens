import StyleDictionary, { Token } from 'style-dictionary'
import { isColorToken } from './color.filter'
import { colorFormatter } from './color.formatter'

StyleDictionary.registerFormat(colorFormatter)

export default [
  {
    destination: 'colors.css',
    transformGroup: 'css',
    format: 'format/color',
    // format: "css/variables",
    filter: (token: Token) => isColorToken(token),
    options: {
      // outputReferences: true,
      // fileHeader: () => {
      //   return ["Collection name: Color Primitives", "Mode: Light"];
      // },
    },
  },
  // {
  //   destination: "colors.semantic.css",
  //   transformGroup: "css",
  //   // format: "css/variables",
  //   format: "format/color",
  //   filter: (token) => isSemanticColor(token),
  //   options: {
  //     outputReferences: true,
  //     fileHeader: () => {
  //       return ["Collection name: Color Semantics", "Mode: Light"];
  //     },
  //   },
  // },

  // {
  //   destination: "colors.intent.css",
  //   transformGroup: "css",
  //   // format: "css/variables",
  //   format: "format/color",
  //   filter: (token) => isIntentColor(token),
  //   options: {
  //     outputReferences: true,
  //     fileHeader: () => {
  //       return ["Collection name: Color Intents", "Mode: Light"];
  //     },
  //   },
  // },
]
