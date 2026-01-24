# Primitives Tokens

Primitives are raw values that will be then used to create a more complex system.
They are the foundation of the design system.

```css
/* They can include: */

/* colors */
--color-arylide-yellow-500: #e3c567;
--color-night-500: #0b0c0c;

/* spacing */
--spacing-unit: 1rem;

/* border */
--border-radius-lg: 8px;

/* shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* or it could be some bases for scaled values */
/* See https://every-layout.dev/rudiments/modular-scale/ */

/* etc. */
```

Some of these categories might be defined as "foundations" in some design systems, and therefore defined only once.
The most common important token are **colors**. They are usually defined using a palette (100 to 900 scale)

## How primitives tokens are defined

- **Each individual value is a separate token**
- **Mostly raw values**
- **No references to other tokens**
- **No meaning-based names**
- **Minimal changes over time**

See this as a "pool" of available raw values that you can pick from later.
It could technically be a huge base of different colors, spacings, with no direct relation so far.

## Who owns primitives?

Usually:

- **Design**: define the palette, spacing scale, etc. → **they choose and own the raw values**
- **Development** → implement in code, Style Dictionary, etc. → **they only consume these raw values**

## Generate color palette

- Figma plugin: [Color Palette Generator](https://www.figma.com/color-palette-generator/) to create scales from a base color.
- [Coolors](https://coolors.co/): can generate color palettes and shades in different formats.

🎨 [Picular](https://www.picular.co/) → type any word and get a related color

## Next Steps

From here, you can create [**semantic tokens**](../2%20-%20semantic/README.md) that will give meaning to these raw values.
