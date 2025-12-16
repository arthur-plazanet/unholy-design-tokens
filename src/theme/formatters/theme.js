import { generateFluidSpaceUnit } from '../../formatters/spacing.js';
import { usesReferences, getReferences } from 'style-dictionary/utils';
import { generateSectionHeader } from '../../utils/template.js';

const toKebab = (s) => s.replace(/_/g, '-').replace(/\./g, '-');

// Collect tokens into { publicName, value } entries
function collectTokens(dictionary) {
  return dictionary.allTokens.map((p) => {
    // Build a public CSS var name like --text-md, --space-lg, etc.
    // based on CTI (category/type/item) when available, else path.
    const path = p.attributes?.item
      ? [p.attributes.category, p.attributes.type, p.attributes.item]
      : p.path;

    let name = path.category
      ? `${path.category}-${path.type}-${path.item}`
      : path.join('-');
    // if (path.type === 'border') {
    // }
    return {
      publicName: `--${toKebab(name)}`,
      privateName: `--_${toKebab(name)}`,
      value: p.value,
      category: p.attributes?.category,
    };
  });
}

export const publicThemeTemplate = {
  name: 'public-theme',
  format: ({ dictionary, options }) => {
    const { outputReferences } = options || {};

    const toks = collectTokens(dictionary); //collectTokens(dictionary);
    let header = `/**
 * Theme Overrides
 * List of CSS variables that can be used to override the default theme
 * Simply uncomment the variables you want to use
 */`;
    let content = `${header}\n:root {`;

    const usedTypes = new Set();
    toks.forEach((t) => {
      const category = t?.category;
      if (category && !usedTypes.has(category)) {
        const sectionHeader = generateSectionHeader(category);

        usedTypes.add(category);
        if (sectionHeader) {
          content += `\n${sectionHeader}`;
        }
      }
      content += `\n  ${t.publicName}: ${t.value};`;
    });
    content += '\n}\n';
    return content;

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
 */`;
    let content = `${header}\n:root {`;

    const usedTypes = new Set();
    toks.forEach((t) => {
      const category = t?.category;
      if (category && !usedTypes.has(category)) {
        const sectionHeader = generateSectionHeader(category);

        usedTypes.add(category);
        if (sectionHeader) {
          content += `\n${sectionHeader}`;
        }
      }
      content += `\n  ${t.privateName}: var(${t.publicName}, ${t.value});`;
    });
    // content += generateSectionHeader('Spacing');
    // content += `  ${generateFluidSpaceUnit(dictionary.allTokens)}\n`;
    content += '\n}\n';
    return content;
    // const body = toks.map((t) => `  ${t.privateName}: var(${t.publicName}, ${t.value});`).join('\n')
    // return `${header}\n${body}\n}\n`
  },
};
