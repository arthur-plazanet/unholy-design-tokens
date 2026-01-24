import path from 'node:path'
import StyleDictionary from 'style-dictionary'
import { logVerbosityLevels } from 'style-dictionary/enums'
import styleDictionaryConfig from '../src/style-dictionary.config'
import {
  tokensDeclarationFormatter,
  typesDeclarationFormatter,
} from '../src/type-declarations/type-declarations.formatter.js'
import { generateTypographyTokens } from './generate-typography-tokens'

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
  }

  let sd = new StyleDictionary(config, {
    verbosity: logVerbosityLevels.verbose,
  })

  // Types formatters
  StyleDictionary.registerFormat(typesDeclarationFormatter)
  StyleDictionary.registerFormat(tokensDeclarationFormatter)

  await sd.buildAllPlatforms()
}
