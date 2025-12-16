const themeCategories = [
  'space',
  'spacing',
  'border',
  'border',
  'shadow',
  'breakpoint',
  'font',
  'text',
  'component',
  'cube',
];

const excludeTypes = [
  'utility',
  // add more types to exclude from theme if needed
];
/**
 * List of categories part of the generated private and public theme
 * See category: https://styledictionary.com/info/tokens/#category--type--item
 *
 * @param {*} token
 * @returns {boolean}
 */
export function isPartOfTheme(token) {
  return themeCategories.includes(token.attributes?.category) &&
    !excludeTypes.includes(token.attributes?.type)
    ? true
    : false;
}

export function filterThemeTokens(token) {
  return isPartOfTheme(token);
}
