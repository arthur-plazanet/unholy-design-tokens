export const spacingFluid = {
  name: 'css/spacing-fluid',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    /***
     * Will generate (with default):
     *
     * {
     *   min: '1.125rem',
     *   max: '3rem',
     *   min_viewport: '360px',
     *   max_viewport: '1280px'
     * }
     */
    const spacingTokenParams = Object.fromEntries(
      tokens
        .filter(
          (t) =>
            t.attributes?.category === 'spacing' &&
            t.attributes?.type === 'fluid'
        )
        .map((t) => [t.attributes.item, t.value])
    );
    console.log('📟 - spacingTokens → ', spacingTokenParams);

    // ---- CONFIG: tweak these to taste ----
    const minViewport = spacingTokenParams.min_viewport; // px
    const maxViewport = spacingTokenParams.max_viewport; // px
    const minRem = spacingTokenParams.min; // base space at min viewport
    const maxRem = spacingTokenParams.max; // base space at max viewport
    // --------------------------------------

    const deltaRem = maxRem - minRem;
    const deltaViewport = maxViewport - minViewport;

    const clampExpr = `clamp(${minRem}rem, calc(${minRem}rem + ${deltaRem.toFixed(
      4
    )} * ((100vw - ${minViewport}px) / ${deltaViewport})), ${maxRem}rem)`;

    let css = `:root {\n`;
    css += `  /* Fluid base space unit (Utopia-style) */\n`;
    css += `  --space-unit: ${clampExpr};\n\n`;

    // Now output each spacing token as a multiple of the fluid unit
    css += `  /* Spacing scale derived from primitives.spacing.* */\n`;
    css += generateFluidSpacing(tokens);

    css += '}\n';

    return css;
  },
};

export function generateFluidSpacing(tokens) {
  console.log('📟 - tokens → ', tokens);
  return tokens
    .filter(
      (t) =>
        t.attributes?.category === 'spacing' || t.attributes?.type === 'spacing'
    )
    .reduce((css, t) => {
      console.log('📟 - t → ', t);
      const item = t.attributes?.item || t.name; // xxs, xs, sm, md…
      console.log('📟 - item → ', item);
      if (item === 'unit') return css; // we already handled unit
      const multiplier = Number(t.value); // e.g. 0.75, 1, 1.5...

      css += `  --space-${item}: calc(var(--space-unit) * ${multiplier});\n`;
      return css;
    }, '');
}

export function generateThemeSpacing(tokens) {
  return (tokens = tokens
    .filter(
      (p) =>
        p.attributes?.category === 'spacing' || p.attributes?.type === 'spacing'
    )
    .map((p) => {
      const name = p.attributes?.item || p.name;

      console.log('📟 - spacing tokens → ', tokens);

      return {
        publicName: `--${toKebab(name)}`,
        privateName: `--_${toKebab(name)}`,
        value: p.value,
        type: p.attributes?.category,
      };
    }));
}
