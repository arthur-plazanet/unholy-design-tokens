import { Format } from 'style-dictionary/types'
import {
  capitalizeFirstLetter,
  generateFigmaHeaderReference,
  generateHeader,
  resolveTokenReferences,
  toKebab,
  tokenName,
} from '../utils'

export const colorFormatter: Format = {
  name: 'format/color',
  format: ({ dictionary, options }) => {
    // Get color tier from first token
    // e.g. 'primitive', 'semantic', 'intent'
    const colorTier = dictionary.allTokens[0].attributes?.tokenTier

    let content = ''
    const header = generateFigmaHeaderReference(
      `Color ${capitalizeFirstLetter(colorTier as string)}`,
      options?.mode || 'Light',
    )
    let currentTier: string | null = null

    dictionary.allTokens.forEach((token) => {
      const value = resolveTokenReferences(token, options, dictionary)

      let usedSubsections = new Set() // resets per category

      const tier: string = token?.attributes?.tokenTier as string

      if (tier && tier !== currentTier) {
        currentTier = tier
        usedSubsections = new Set()
        content += generateHeader(tier)
      }

      const name = `--${toKebab(tokenName(token))}`
      content += `${name}: ${value};\n`
    })
    return `${header}\n:root {\n${content}}`
  },
}
