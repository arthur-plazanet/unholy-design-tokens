/**
 * Utility functions for template generation.
 * https://styledictionary.com/reference/hooks/formats/#using-a-template--templating-engine-to-create-a-format
 */
import { capitalizeFirstLetter } from "./helpers.js";

export {
  generateHeader,
  generateSubheader,
  formatInLayer,
  generateFigmaHeaderReference,
};

const startComment = "/* ";
const endComment = " */";
const headerLength = 60;
const subheaderLength = 20;
const separatorChar = "-";
const headerSeparator = " ";

function generateSeparator(length: number): string {
  return `${startComment}${separatorChar.repeat(length)}${endComment}`;
}

/**
 * Will generate a comment block like this:
/* ------------------------------------------------------------ *\/
/*                            Title                             *\/
/* ------------------------------------------------------------ *\/
 *
 */
function generateCommentBlock(title: string, totalLength: number, separatorChar: string, indent = ""): string {
  let titleTotalLength = totalLength - title.length;
  let halfLength = Math.floor(titleTotalLength / 2);
  let titleSeparator = headerSeparator.repeat(halfLength);

  if (totalLength % 2 !== 0) {
    titleSeparator += separatorChar;
  }

  return (
    `\n${indent}${generateSeparator(totalLength)}` +
    `\n${indent}${startComment}${titleSeparator}${title}${titleSeparator}${endComment}` +
    `\n${indent}${generateSeparator(totalLength)}\n`
  );
}

/**
 * Generates a header comment block for a given header string.
 * /* ------------------------------------------------------------ *\/
 * /*                            Header                            *\/
 * /* ------------------------------------------------------------ *\/
 */
function generateHeader(header: string): string {
  if (!header) return "";

  return generateCommentBlock(
    capitalizeFirstLetter(header),
    headerLength,
    separatorChar,
    "",
  );
}

/**
 * Generates a subheader comment block for a given subheader string.
 * /* ---------------------- \/*
 * /*       Subheader        *\/
 * /* ---------------------- *\/
 */
function generateSubheader(subheader: string): string {
  if (!subheader) return "";

  return generateCommentBlock(
    capitalizeFirstLetter(subheader),
    subheaderLength,
    separatorChar,
    "  ",
  );
}

/**
 * Formats content within a CSS layer block.
 * @layer name {
 *   :root {
 *     --variable: value;
 *   }
 * }
 */
function formatInLayer(name: string, content: string): string {
  let result = `@layer ${name} {`;
  result += `\n`;
  result += `  :root {`;
  result += `\n`;
  result += `${content}`;
  result += `  }\n`;
  result += `}\n`;
  return result;
}

/**
 * Generates a Figma header reference comment block
 * /* Collection name: <collectionName> *\/
 * /* Mode: <mode> *\/
 *
 * See https://www.figma.com/community/plugin/1470777269812001046/css-variables-import-export
 */
function generateFigmaHeaderReference(collectionName: string, mode = "Light"): string {
  return `/* Collection name: ${collectionName} */\n/* Mode: ${mode} */`;
}
