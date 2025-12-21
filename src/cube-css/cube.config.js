import { formats, transformGroups } from "style-dictionary/enums";
import {
  cubeCssVariablesLayerFormatter,
  cubeUtilityFormatter,
} from "./formatters/cube-css.js";
import StyleDictionary from "style-dictionary";

const cubeBuildPath = "cube";

const cubeFormat = "cube/css-variables-layer";

StyleDictionary.registerFormat(cubeCssVariablesLayerFormatter);
StyleDictionary.registerFormat(cubeUtilityFormatter);

export default [
  // 2. CUBE: Composition → @layer objects
  {
    destination: `${cubeBuildPath}/cube.composition.css`,
    // format: cubeFormat,
    format: formats.cssVariables,

    filter: (token) => {
      console.log("📟 - token → ", token);
      return (
        token.attributes?.category === "cube" &&
        token.attributes?.type === "composition"
      );
    },
    options: {
      layerName: "objects", // ITCSS x CUBE
      selector: ":root",
      outputReferences: true,
    },
  },
  // 3. CUBE: Block → @layer components
  {
    destination: `${cubeBuildPath}/cube.block.css`,
    // format: cubeFormat,
    format: formats.cssVariables,

    filter: (token) => {
      console.log("📟 - token → ", token);
      return (
        token.attributes?.category === "cube" &&
        token.attributes?.type === "block"
      );
    },
    options: {
      layerName: "components",
      selector: ":root",
      outputReferences: true,
    },
  },
  // 4. CUBE: Utility → @layer utilities
  {
    destination: `${cubeBuildPath}/cube.utility.css`,
    format: "cube/utility",
    // format: formats.cssVariables,

    filter: (token) =>
      token.attributes?.category === "cube" &&
      token.attributes?.type === "utility",
    options: {
      // layerName: "utilities",
      // selector: ":root",
      outputReferences: true,
    },
  },
];
