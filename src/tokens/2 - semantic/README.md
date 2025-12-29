## 📂 `tokens/semantic/README.md`

# Semantic Tokens

Semantic tokens define **meaning** inside the design system.

## Why this term "semantic" is confusing designers and developers

These tokens don't define the semantic in the HTML or front-end, they define meaning in the design system tokens hierarchy.

> See [_About HTML semantics and front-end architecture_](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

## Why to use semantic tokens

- Use [aliasing](https://designtokens.fyi/#/terms/alias/) to create a presentation interface that is decoupled from raw values.
- They usually are usued in multiple locations, linked to a common purpose.
- They create a stable API for theming and branding.

```css
/* Mostly colors are aliased through different token Tier */
/* colors */
--color-primary-500: var(--color-arylide-yellow-500)
  /* will resolve to primitive #e3c567 */
  --color-secondary-500: var(--color-night-500); /* will resolve to primitive #0b0c0c */
/* but depending on system, it can also be aliased for convenience elsewhere */
--spacing-multiplier: 1.5; /* Semantic value that applies to a specific theming */
--spacing-xs: calc(var(--spacing-unit) * var(--spacing-multiplier) * 0.5);
--spacing-md: calc(var(--spacing-unit) * var(--spacing-multiplier) * 1);
/* etc. */
```

If you wish to change your primary color, you only need to update `--color-primary-500` to point to another primitive color from the pool of colors.

## Cheat Sheet

- **MUST reference primitives**
- **No raw values**
- **Stable across themes (light/dark/brand)**

## Next Steps

From here, you can create [**intent tokens**](../3%20-%20intent/README.md) that will map these semantic tokens to specific component needs.
