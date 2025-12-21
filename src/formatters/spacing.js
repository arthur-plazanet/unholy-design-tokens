export const spacingFluid = {
  name: "css/spacing-fluid",
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    let css = `:root {\n`;
    css += `  /* Fluid base space unit (Utopia-style) */\n`;
    css += `  ${generateFluidSpaceUnit(tokens)}\n`;

    // Now output each spacing token as a multiple of the fluid unit
    css += `  /* Spacing scale derived from primitives.spacing.* */\n`;
    // css += generateFluidSpacing(tokens);

    css += "}\n";

    return css;
  },
};

export function generateFluidSpacing(tokens) {
  console.log("📟 - tokens → ", tokens);
  let content = `${generateFluidSpaceUnit(tokens)}\n`;
  console.log("📟 - content → ", content);

  content += tokens
    .filter(
      (t) =>
        t.attributes?.category === "spacing" ||
        t.attributes?.type === "spacing",
    )
    .reduce((css, t) => {
      const item = t.attributes?.item || t.name; // xxs, xs, sm, md…
      if (item === "unit") return css; // we already handled unit
      const multiplier = Number(t.value); // e.g. 0.75, 1, 1.5...

      css += `  --space-${item}: calc(var(--space-unit) * ${multiplier});\n`;
      return css;
    }, "");
  return content;
}

export function generateThemeSpacing(tokens) {
  return (tokens = tokens
    .filter(
      (p) =>
        p.attributes?.category === "spacing" ||
        p.attributes?.type === "spacing",
    )
    .map((p) => {
      const name = p.attributes?.item || p.name;

      return {
        publicName: `--${toKebab(name)}`,
        privateName: `--_${toKebab(name)}`,
        value: p.value,
        type: p.attributes?.category,
      };
    }));
}

export function calculateClamp(tokens) {
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
          t.attributes?.category === "spacing" &&
          t.attributes?.type === "fluid",
      )
      .map((t) => [t.attributes.item, t.value]),
  );

  // ---- CONFIG: tweak these to taste ----
  const minViewport = spacingTokenParams.min_viewport
    .replace("px", "")
    .replace("rem", "")
    .replace("svw", ""); // px
  const maxViewport = spacingTokenParams.max_viewport
    .replace("px", "")
    .replace("rem", "")
    .replace("svw", ""); // px
  const minRem = spacingTokenParams.min.replace("rem", ""); // base space at min viewport
  const maxRem = spacingTokenParams.max.replace("rem", ""); // base space at max viewport
  // --------------------------------------

  const deltaRem = maxRem - minRem;
  const deltaViewport = maxViewport - minViewport;

  const clampExpr = `clamp(${minRem}rem, calc(${minRem}rem + ${deltaRem.toFixed(
    4,
  )} * ((100vw - ${minViewport}px) / ${deltaViewport})), ${maxRem}rem)`;

  return clampExpr;
}

export function generateFluidSpaceUnit(tokens) {
  const clampExpr = calculateClamp(tokens);
  return `--space-unit: ${clampExpr};\n`;
}
