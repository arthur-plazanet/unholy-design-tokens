// theme.files.js
import { filterThemeTokens } from "./theme.filter.js";

export default [
  // Base theme (no cube)
  {
    destination: "themes/private-theme.css",
    format: "private-theme",
    filter: filterThemeTokens,
    options: {
      // outputReferences: true,
    },
  },
  {
    destination: "themes/public-theme.css",
    format: "public-theme",
    filter: filterThemeTokens,
    options: {
      // outputReferences: true,
    },
  },

  // // Optional theme + cube (appended)
  // {
  //   destination: "themes/private-theme+cube.css",
  //   format: "private-theme+cube",
  //   filter: (token) =>
  //     filterThemeTokens(token) || token.attributes?.category === "cube",
  //   options: {
  //     outputReferences: true,
  //   },
  // },
  // {
  //   destination: "themes/public-theme+cube.css",
  //   format: "public-theme+cube",
  //   filter: (token) =>
  //     filterThemeTokens(token) || token.attributes?.category === "cube",
  //   options: {
  //     outputReferences: true,
  //   },
  // },
];
