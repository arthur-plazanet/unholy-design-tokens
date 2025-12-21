import StyleDictionary from "style-dictionary";
import styleDictionaryConfig from "../src/style-dictionary.config.js";

const myStyleDictionary = new StyleDictionary(styleDictionaryConfig);

await myStyleDictionary.buildAllPlatforms();

console.log("📟 - Build completed!");
