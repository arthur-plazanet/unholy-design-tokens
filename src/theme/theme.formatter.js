// theme.js
import StyleDictionary from 'style-dictionary'
import { generateThemeCubeCSS } from '../cube-css/cube.formatter.js'
import { toKebab } from '../utils/helpers.js'
import { resolveTokenReferences, tokenName } from '../utils/tokens.js'
import { generateThemeContent } from './helper.js'

/**
 * Takes a token and format it to be rendered in the theme files.
 *
 * Will return:
 * - public name for build/css/themes/public-theme.css
 * - private name for build/css/themes/private-theme.css
 * - resolved value (with references rewritten) or raw value
 * - category for sectioning (heading sections)
 * - subsection for subheading sections
 *
 *
 * @param {*} tokens
 * @param {*} options
 * @param {*} dictionary
 * @param {*} scope
 * @returns {{}}
 */
function formatToThemeToken(token, options, dictionary, scope) {
  const privateVar = scope === 'private'

  // const normal = tokens.map((t) => {
  // const originalValue = t.original?.value;

  return {
    publicName: `--${toKebab(tokenName(token))}`,
    privateName: `--_${toKebab(tokenName(token))}`,
    value: resolveTokenReferences(token, options, dictionary, privateVar),
    category: token.attributes?.category,
    subsection: token.attributes?.subsection,
  }
}

function buildTheme({ dictionary, options }, scope) {
  const header =
    scope === 'public'
      ? `/**
 * Theme Overrides
 * List of CSS variables that can be used to override the default theme
 * Simply uncomment the variables you want to use
 */`
      : `/**
 * Internal default theme variables
 * Using CSS pseudo-private custom properties
 * https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/
 */`

  //  We exclude cube tokens from the main theme output
  const themeTokens = dictionary.allTokens.filter((t) => t.attributes?.category !== 'cube')
  let toks = themeTokens.map((token) => formatToThemeToken(token, options, dictionary, scope))

  toks = [...toks, ...generateThemeCubeCSS(dictionary.allTokens)]

  return `${header}\n:root {${generateThemeContent(toks, scope)}\n}\n`
}

StyleDictionary.registerFormat({
  name: 'public-theme',
  format: (args) => buildTheme(args, 'public'),
})

StyleDictionary.registerFormat({
  name: 'private-theme',
  format: (args) => buildTheme(args, 'private'),
})
