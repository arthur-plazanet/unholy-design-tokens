// cube.files.js
import StyleDictionary, { Token } from 'style-dictionary'
import { formats } from 'style-dictionary/enums'
import { cubeUtilityFormatter } from './cube.formatter'

const cubeBuildPath = 'cube'

// registers "cube/utility"
StyleDictionary.registerFormat(cubeUtilityFormatter)

export default [
  // Composition → @layer objects
  {
    destination: `${cubeBuildPath}/cube.composition.css`,
    format: formats.cssVariables,
    filter: (token: Token) =>
      token.attributes?.category === 'cube' && token.attributes?.type === 'composition',
    options: {
      layerName: 'objects',
      selector: ':root',
      // if your cube values are already "var(...)" and not "{...}",
      // you don't need SD reference output:
      outputReferences: false,
    },
  },

  // Block → @layer components
  {
    destination: `${cubeBuildPath}/cube.block.css`,
    format: formats.cssVariables,
    filter: (token: Token) =>
      token.attributes?.category === 'cube' && token.attributes?.type === 'block',
    options: {
      layerName: 'components',
      selector: ':root',
      outputReferences: false,
    },
  },

  // Utility → custom formatter
  {
    destination: `${cubeBuildPath}/cube.utility.css`,
    format: 'cube/utility',
    filter: (token: Token) =>
      token.attributes?.category === 'cube' && token.attributes?.type === 'utility',
    options: {
      outputReferences: false,
    },
  },
]
