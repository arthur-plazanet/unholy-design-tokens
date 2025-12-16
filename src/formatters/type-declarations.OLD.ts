import type { FormatFnArguments } from 'style-dictionary/types';

/**
 * Generates a TypeScript interface declaration for all design tokens.
 *
 * @type {{ name: string; format: ({ dictionary }: FormatFnArguments) => string; }}
 *
 * Will return:
 * export interface YThemeToken {
 *   tokenName1: string;
 *   tokenName2: string;
 *   ...
 * }
 */
export const typesDeclarationFormatter = {
  name: 'typescript/types-declaration',
  format: function ({ dictionary }: FormatFnArguments) {
    const props = dictionary.allTokens;
    const types = props.map((token) => `  ${token.name}: string;`).join('\n');

    return `export interface YThemeToken {\n${types}\n}\n`;
  },
};
