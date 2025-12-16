# 🎯 Why this exists

Design tokens are often explained in abstract, design-heavy language that makes them hard to adopt for engineers

## _What are design tokens_?

Here are some definitions from popular design systems:

<details>
<summary>Expand all definitions</summary>

[Material Design](https://m3.material.io/foundations/design-tokens/overview):

> Design tokens are small, reusable design decisions that make up a design system's visual style. Tokens replace static values with self-explanatory names.

[Atlassian](https://atlassian.design/foundations/tokens/design-tokens)

> Design tokens are name and value pairings that represent small, repeatable design decisions. A token can be a color, font style, unit of white space, or even a motion animation designed for a specific need.

[Pajamas Design System](https://design.gitlab.com/product-foundations/design-tokens/)

> Design tokens are a methodology to pair design decisions with options from the design system. Design tokens abstract out variables like color, typography, and spacing for consistent and meaningful user interface (UI) design across tools and platforms. The following is a basic example of a design token, where design.token.name is the name, and #abcdef is the value.

[Spectrum](https://spectrum.adobe.com/page/design-tokens/)

> Design tokens are design decisions, translated into data. They act as a “source of truth” to help ensure that product experiences feel unified and cohesive.

The [Specs](https://www.designtokens.org/tr/2025.10/#abstract)

> Design tokens are indivisible pieces of a design system such as colors, spacing, typography scale.

The [Specs Glossary](https://www.designtokens.org/glossary/#design-token)

> The single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages.

</details>

## There's a lot of confusion around different terminology and practical implementation.

The best example is `semantic tokens`. _What are semantic tokens_?

The most common explanation is:

> Semantic tokens are design tokens that are named according to their meaning and purpose within the design system, rather than their specific visual attributes.

Sometimes it includes "context" or not.

They are different answers which cause mismatches in understanding:

- From a designer's perspective, semantic tokens are often colors with meaning (e.g., "error", "warning"). Some teams use:

```css
--color-primary-700: var(--color-blue-700);
--color-error: var(--color-red-600);
```

- From a developer's perspective, semantic tokens are colors that adapt based on context (e.g "background", "text"). Some teams use:

```css
--color-bg-primary-hover: var(--color-blue-700);
--color-text-error: var(--color-red-600);
```

Some article project the future _semantic_ ([Figma - The future of design systems is semantic](https://www.figma.com/blog/the-future-of-design-systems-is-semantic/#closing-the-gap-between-design-and-code)) without mentoning the word `semantic`after.

---

1. Primitives = raw hues (never touched)
2. Brand palette = brand colors (rarely changed)
3. Semantic roles = meaning (design language) ← you use this
4. Components = actual bg/fg/border config ← you use this

// emoji arrow
:arrow_right: This project is a playground to try to simplify the concept of design tokens and provide a practical framework for implementing and customize them using Style Dictionary.
