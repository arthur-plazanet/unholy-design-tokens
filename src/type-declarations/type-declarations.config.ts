import StyleDictionary from 'style-dictionary'
import {
  tokensDeclarationFormatter,
  typesDeclarationFormatter,
} from './type-declarations.formatter'

StyleDictionary.registerFormat(typesDeclarationFormatter)
StyleDictionary.registerFormat(tokensDeclarationFormatter)

export default {
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
    transformGroup: 'css',
    buildPath: 'types/',
    files: [
      {
        destination: 'tokens.ts',
        format: 'typescript/tokens-declaration',
      },
    ],
  },
}
