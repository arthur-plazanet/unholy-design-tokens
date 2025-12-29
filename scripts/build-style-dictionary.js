import StyleDictionary from "style-dictionary";
import styleDictionaryConfig from "../src/style-dictionary.config.js";
import path from "node:path";
import { generateTypographyTokens } from "./generate-typography-tokens.js";

function ensureTrailingSlash(p) {
  // Style Dictionary wants POSIX-ish trailing slash, even on Windows it accepts `/`
  return p.endsWith(path.sep) ? p : p + path.sep;
}

export async function buildStyleDictionary(outDir) {
  // 1️⃣ Generate typography tokens FIRST
  generateTypographyTokens();

  // clone config so we can override buildPath safely
  const config = {
    ...styleDictionaryConfig,
    platforms: Object.fromEntries(
      Object.entries(styleDictionaryConfig.platforms).map(
        ([name, platform]) => [name, { ...platform }],
      ),
    ),
  };

  for (const platform of Object.values(config.platforms)) {
    platform.buildPath = ensureTrailingSlash(
      path.resolve(outDir, platform.buildPath ?? "./build/"),
    );
  }

  let sd = new StyleDictionary(config);

  await sd.buildAllPlatforms();
}
