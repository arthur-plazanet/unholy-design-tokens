export const themeTypesFormatter = {
  name: 'typescript/theme-declarations',
  format: function ({ dictionary }) {
    const props = dictionary.allTokens;
    const types = props.map((token) => `${token.name}: string;`).join('\n');

    return `export interface YThemeToken {\n${types}\n}\n`;
  },
};

const toKebab = (s) =>
  s
    .replace(/_/g, '-')
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Build public/private CSS var names from tokens.
 *
 * Rules:
 * - For "normal" tokens (color, border, space, etc.), keep:
 *     --{type}-{item}[-{subitem}]
 *   e.g. --border-width-default, --space-md
 *
 * - For cube tokens (category: "cube"):
 *   - type = "block", "composition", "utility", ...
 *   - item = e.g. "card", "stack", "cluster"
 *   - subitem = e.g. "background", "borderColor", "gap"
 *
 *   Option A mapping:
 *   - block/card/background  → --block-card-background
 *   - composition/stack/gap  → --stack-gap
 *   - utility/spacing/mt-0   → --utility-spacing-mt-0
 *
 *   Private vars are the same but prefixed with "--_".
 */
function collectTokens(dictionary) {
  return dictionary.allTokens.map((p) => {
    const attrs = p.attributes || {};
    const path = p.path || [];

    let publicName;

    if (attrs.category === 'cube') {
      const area = attrs.type; // "block", "composition", "utility", ...
      const element = attrs.item; // "card", "stack", "cluster", ...
      const prop =
        attrs.subitem || attrs.state || attrs.role || path[3] || null;

      if (area === 'block') {
        // block/card/background → --block-card-background
        if (prop) {
          publicName = `--block-${toKebab(element)}-${toKebab(prop)}`;
        } else {
          publicName = `--block-${toKebab(element)}`;
        }
      } else if (area === 'composition') {
        // composition/stack/gap → --stack-gap
        // composition/cluster/gap → --cluster-gap
        if (prop) {
          publicName = `--${toKebab(element)}-${toKebab(prop)}`;
        } else {
          publicName = `--${toKebab(element)}`;
        }
      } else {
        // fallback for other cube types, e.g. utility/spacing/mt-0 → --utility-spacing-mt-0
        if (prop) {
          publicName = `--${toKebab(area)}-${toKebab(element)}-${toKebab(
            prop
          )}`;
        } else {
          publicName = `--${toKebab(area)}-${toKebab(element)}`;
        }
      }
    } else {
      // Non-cube tokens: keep the original type-item-subitem pattern
      const type = attrs.type || path[0];
      const item = attrs.item || path[1] || 'default';
      const subitem = attrs.subitem;

      const base = subitem ? `${type}-${item}-${subitem}` : `${type}-${item}`;

      publicName = `--${toKebab(base)}`;
    }

    const privateName = publicName.replace(/^--/, '--_');

    return {
      publicName,
      privateName,
      value: p.value,
      type: attrs.type,
    };
  });
}

export const publicThemeTemplate = {
  name: 'public-theme',
  format: ({ dictionary }) => {
    const toks = collectTokens(dictionary);

    let css = `/**
 * Theme Overrides
 * List of CSS variables that can be used to override the default theme
 * Simply uncomment the variables you want to use
 */
:root {`;

    const usedTypes = new Set();

    toks.forEach((t) => {
      const type = t?.type;
      if (type && !usedTypes.has(type)) {
        const sectionType = `$->{
          usedTypes.size > 0 ? '\n' : ''
        }/* -------------------------------------------------- */
/* ${capitalizeFirstLetter(type)} */
/* -------------------------------------------------- */`;
        usedTypes.add(type);
        css += `\n${sectionType}`;
      }

      css += `\n  ${t.publicName}: ${t.value};`;
    });

    css += '\n}\n';
    return css;
  },
};

export const privateThemeTemplate = {
  name: 'private-theme',
  format: ({ dictionary }) => {
    const toks = collectTokens(dictionary);

    let css = `/**
 * Internal default theme variables
 * Using CSS pseudo-private custom properties 
 * https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/
 */
:root {`;

    const usedTypes = new Set();

    toks.forEach((t) => {
      const type = t?.type;
      if (type && !usedTypes.has(type)) {
        const sectionType = `$->{
          usedTypes.size > 0 ? '\n' : ''
        }/* -------------------------------------------------- */
/* ${capitalizeFirstLetter(type)} */
/* -------------------------------------------------- */`;
        usedTypes.add(type);
        css += `\n${sectionType}`;
      }

      css += `\n  ${t.privateName}: var(${t.publicName}, ${t.value});`;
    });

    css += '\n}\n';
    return css;
  },
};
