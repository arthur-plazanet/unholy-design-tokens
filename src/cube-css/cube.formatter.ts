import { Token } from 'style-dictionary'
import { Format } from 'style-dictionary/types'
import { generateHeader, toKebab } from '../utils'

/**
 * Build public/private CSS var names from tokens.
 *
 * Rules:
 * - For "normal" tokens (color, border, space, etc.), keep:
 *     --{type}-{item}[-{subitem}]
 *   e.g. --border-width-default, --space-md
 *
 * - For cube tokens (category: "cube"):
 *   - type = "block", "composition", "utility", ...
 *   - item = e.g. "card", "stack", "cluster"
 *   - subitem = e.g. "background", "borderColor", "gap"
 *
 *   Option A mapping:
 *   - block/card/background  → --block-card-background
 *   - composition/stack/gap  → --stack-gap
 *   - utility/spacing/mt-0   → --utility-spacing-mt-0
 *
 */

export function generateThemeCubeCSS(tokens: Token[]) {
  const order = ['global', 'composition', 'block', 'utility']
  return tokens
    .filter((t) => t.attributes?.category === 'cube')
    .sort((a, b) => {
      const aType: string = a.attributes?.type as string
      const bType: string = b.attributes?.type as string
      const aIndex = order.indexOf(aType)
      const bIndex = order.indexOf(bType)
      return aIndex - bIndex
    })
    .map((t) => generateThemeCubeCSSVariables(t))
}

export function generateThemeCubeCSSVariables(token: Token) {
  const attrs = token.attributes || {}
  const path = token.path || []

  const item = attrs.item || path[1] || 'default'
  const subitem = attrs.subitem

  const base = subitem ? `${item}-${subitem}` : `${item}` // no dangling "-"

  const publicName = `--${toKebab(base)}`
  const privateName = publicName.replace(/^--/, '--_')

  return {
    publicName,
    privateName,
    value: token.value,
    category: attrs.category, // "cube"
    subsection: attrs.type, // ✅ "block" | "composition" | ...
  }
}

/**
 * CUBE: Utility → @layer utilities
 * Generate utility classes from tokens.
 */
export const cubeUtilityFormatter: Format = {
  name: 'cube/utility',
  format: ({ dictionary }) => {
    let content = ''
    const usedItems = new Set()
    dictionary.allTokens.forEach((token) => {
      const item = token.attributes?.item
      if (item && !usedItems.has(item)) {
        usedItems.add(item)
        content += generateHeader(item as string)
      }
      content += generateCubeUtilityClass(token)
    })
    return content
  },
}

export function generateCubeUtilityClass(token: Token) {
  // fallback for other cube types, e.g. utility/spacing/mt-0 → --utility-spacing-mt-0
  const attrs = token.attributes || {}
  const path = token.path || []
  const item = attrs.item || path[1] || ''
  let className = ''

  const hideItems = ['display']

  if (!hideItems.includes(item)) {
    className = `${item}-`
  } else {
    className = ``
  }

  const subitem = attrs.subitem ? `${attrs.subitem}` : ''
  const state = attrs.state ? `-${attrs.state}` : ''
  className = `${className}${subitem}${state}`
  className = `.${toKebab(className)}`

  const classCssContent = `${token.value}`

  return `${className} { ${classCssContent} } \n`
}
