/**
 * TODO: Review as Claude did 80%
 *
 * Generates a TypeScript nested interface declaration for all design tokens.
 *
 * ---------------------------------------------------------------
 * TODO: OLD VERSION FOR FULL STRING TOKENS
 * ---------------------------------------------------------------
 */
export const tokensDeclarationFormatter = {
  name: "typescript/tokens-declaration",
  format: function ({ dictionary }) {
    const myMap = dictionary.tokenMap;
    console.log("📟 - props → ", myMap);
    let content = "";
    let types = "";
    for (const value of myMap.values()) {
      console.log("📟 - key → ", value);
      // const attributes = props[key].attributes || {};
      // console.log("📟 - attributes → ", attributes);
      // console.log("📟 - key, attributes → ", key, attributes);
      // const category = attributes.category;
      // const type = attributes.type;
      // const item = attributes.item;
      // // Build nested structure based on category/type/item
      // let typeString = "";
      // if (category && type && item) {
      //   typeString = `${category}-${type}-${item}`;
      // } else if (category && type) {
      //   typeString = `${category}-${type}`;
      // } else if (category) {
      //   typeString = `${category}`;
      // } else {
      //   typeString = key;
      // }
      // return typeString;
      const name = value.name;
      console.log("📟 - name → ", name);
      types += `  '${name}': string;\n`;
    }

    return `export interface YThemeToken {\n${types}\n}\n`;
  },
};
/**
 * @type {{ name: string; format: ({ dictionary }: FormatFnArguments) => string; }}
 *
 * Will return:
 * export interface DesignTokens {
 *   border: {
 *     width: {
 *       base: string;
 *       scale: string;
 *     };
 *   };
 *   ...
 * }
 */
export const typesDeclarationFormatter2 = {
  name: "typescript/types-declaration",
  format: function ({ dictionary }) {
    const interfaceBody = generateNestedInterface(dictionary.tokens, 1);
    return `/**
 * Do not edit directly, this file was auto-generated.
 */

export interface DesignTokens {
${interfaceBody}}
`;
  },
};

/**
 * Check if an object is a leaf token (has $value or value property)
 */
function isToken(obj) {
  return obj && typeof obj === "object" && ("$value" in obj || "value" in obj);
}

/**
 * Escape property name if it contains special characters
 */
function formatKey(key) {
  // If key starts with a number or contains special chars, quote it
  if (/^[0-9]/.test(key) || /[^a-zA-Z0-9_$]/.test(key)) {
    return `'${key}'`;
  }
  return key;
}

/**
 * Recursively generate nested interface from token tree
 */
function generateNestedInterface(obj, depth = 0) {
  const indent = "  ".repeat(depth);
  let result = "";

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (isToken(value)) {
      // Leaf token - output as string type
      result += `${indent}${formatKey(key)}: string;\n`;
    } else if (typeof value === "object" && value !== null) {
      // Nested object - recurse
      const nested = generateNestedInterface(value, depth + 1);
      if (nested.trim()) {
        result += `${indent}${formatKey(key)}: {\n${nested}${indent}};\n`;
      }
    }
  }

  return result;
}

export const typesDeclarationFormatter = {
  name: "typescript/theme-declarations",
  format: function ({ dictionary }) {
    console.log(
      "Generating TypeScript theme declarations for tokens...",
      dictionary.tokenMap,
    );
    const ctiTree = dictionary.getCTITree();

    const interfaceBody = createInterfaceFromTokenLevel(ctiTree);

    return `export interface YThemeToken {\n${interfaceBody}}\n`;
  },
};
