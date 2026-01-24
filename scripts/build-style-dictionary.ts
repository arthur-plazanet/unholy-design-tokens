import path from 'node:path'
import StyleDictionary from 'style-dictionary'
import { logVerbosityLevels } from 'style-dictionary/enums'
import {
  tokensDeclarationFormatter,
  typesDeclarationFormatter,
} from '../src/formatters/type-declarations.js'
import styleDictionaryConfig from '../src/style-dictionary.config'
// @ts-expect-error - JS module without type declarations
import { generateTypographyTokens } from './generate-typography-tokens.js'

function ensureTrailingSlash(p: string): string {
  // Style Dictionary wants POSIX-ish trailing slash, even on Windows it accepts `/`
  return p.endsWith(path.sep) ? p : p + path.sep
}

export async function buildStyleDictionary(outDir: string) {
  // 1️⃣ Generate typography tokens FIRST
  generateTypographyTokens()

  // clone config so we can override buildPath safely
  const config = {
    ...styleDictionaryConfig,
    platforms: Object.fromEntries(
      Object.entries(styleDictionaryConfig.platforms).map(([name, platform]) => [
        name,
        { ...platform },
      ]),
    ),
  }

  for (const platform of Object.values(config.platforms)) {
    platform.buildPath = ensureTrailingSlash(path.resolve(outDir, platform.buildPath ?? './build/'))
    console.log('📟 - platform.buildPath → ', platform.buildPath)
  }

  let sd = new StyleDictionary(config, {
    verbosity: logVerbosityLevels.verbose,
  })

  // Types formatters
  StyleDictionary.registerFormat(typesDeclarationFormatter)
  StyleDictionary.registerFormat(tokensDeclarationFormatter)

  await sd.buildAllPlatforms()
}
