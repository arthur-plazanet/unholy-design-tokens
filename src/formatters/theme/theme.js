const toKebab = (s) => s.replace(/_/g, '-').replace(/\./g, '-');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const themeCategories = [
  'spacing',
  'border',
  'spacing',
  'border',
  'shadow',
  'breakpoint',
  'component',
];
/**
 * List of categories part of the generated private and public theme
 * See category: https://styledictionary.com/info/tokens/#category--type--item
 *
 * @param {*} token
 * @returns {boolean}
 */
export function isPartOfTheme(token) {
  return themeCategories.includes(token.attributes?.category);
}

export function filterThemeTokens(token) {
  return isPartOfTheme(token);
}

// Collect tokens into { publicName, value } entries
function collectTokens(dictionary) {
  return dictionary.allTokens.map((p) => {
    // Build a public CSS var name like --text-md, --space-lg, etc.
    // based on CTI (category/type/item) when available, else path.
    const path = p.attributes?.item
      ? [p.attributes.category, p.attributes.type, p.attributes.item]
      : p.path;

    // let name = path.category ? `${path.category}-${path.type}-${path.item}` : path.join('-');
    // remove duplicates/empties and kebab-case
    const name = `${p?.attributes?.category}-${
      p.attributes?.type ? '-' + p.attributes.type : ''
    }${p.attributes.item ? '-' + p.attributes.item : ''}${
      p.attributes.subitem ? `-${p.attributes.subitem}` : ''
    }`;
    return {
      publicName: `--${toKebab(name)}`,
      privateName: `--_${toKebab(name)}`,
      value: p.value,
      type: p.attributes?.category,
    };
  });
}

export const publicThemeTemplate = {
  name: 'public-theme',
  format: ({ dictionary }) => {
    const toks = collectTokens(dictionary);
    let header = `/**
 * Theme Overrides
 * List of CSS variables that can be used to override the default theme
 * Simply uncomment the variables you want to use
 */
:root {`;

    const usedTypes = new Set();
    toks.forEach((t) => {
      console.log('📟 - t → ', t.category);
      const type = t?.type;
      console.log('📟 - type → ', type);
      if (type && !usedTypes.has(type)) {
        const sectionType = `${
          usedTypes.size > 0 ? '\n' : ''
        }/* -------------------------------------------------- */
/* ${capitalizeFirstLetter(type)} */
/* -------------------------------------------------- */`;

        usedTypes.add(type);
        if (sectionType) {
          header += `\n${sectionType}`;
        }
      }
      header += `\n  ${t.publicName}: ${t.value};`;
    });
    header += '\n}\n';
    return header;

    // const body = toks.map((t) => `  /* ${t.publicName}: ${t.value}; */`).join('\n')
    // return `${header}\n${body}\n}\n`
  },
};

export const privateThemeTemplate = {
  name: 'private-theme',
  format: ({ dictionary }) => {
    const toks = collectTokens(dictionary);
    let header = `/**
 * Internal default theme variables
 * Using CSS pseudo-private custom properties 
 * https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/
 */
:root {`;

    const usedTypes = new Set();
    toks.forEach((t) => {
      const type = t?.type;
      console.log('📟 - type → ', type);
      if (type && !usedTypes.has(type)) {
        const sectionType = `${
          usedTypes.size > 0 ? '\n' : ''
        }/* -------------------------------------------------- */
/* ${capitalizeFirstLetter(type)} */
/* -------------------------------------------------- */`;

        usedTypes.add(type);
        if (sectionType) {
          header += `\n${sectionType}`;
        }
      }
      header += `\n  ${t.privateName}: var(${t.publicName}, ${t.value});`;
    });
    header += '\n}\n';
    return header;
    // const body = toks.map((t) => `  ${t.privateName}: var(${t.publicName}, ${t.value});`).join('\n')
    // return `${header}\n${body}\n}\n`
  },
};
