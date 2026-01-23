# 🧩 Design Tokens

## 🧠 What is a design token?

**design token = a variable containing a value** used for styling.

Instead of this:

```css
background: #6f53db;
color: #ffffff;
border-radius: 8px;
```

We use this:

```css
background: var(--color-bg-primary);
color: var(--color-text-primary);
border-radius: var(--radius-lg);
```

## Why?

Because if we change a color later, or add themes, or update branding —

**we update 1 token instead of 400 files.**

1 Token = **1 variable for design**.

---

## Naming Schema

The [schema](https://designtokens.fyi/#/terms/schema/) chosen is very close to the CTI (Category, Type, Item) methodology.

- **Category**: color, spacing, border, shadow, etc.
- **Type**: to describe the kind of category
  - bg (background), text, radius, etc.
- **Item**: specific purpose / name, but can also be a variant / [priority](https://designtokens.fyi/#/terms/priority/) (primary, secondary, etc.)

_All level don't have to be used all the time._

<!-- TODO: -->

- We can have a token with only Category + Type: `--spacing-multiplier`
- Or Category + Type + Item: `--color-text-secondary`
- Or Category + Item: `--border-radius-lg`

This Schema can sometimes be expanded with a 4th level:

- **Interaction** ([designtoken.fyi](https://designtokens.fyi/#/terms/interaction/)) (or sometimes called state) when needed. (hover, active, disabled, etc.)
- **Subitem**: rarely used, but can be useful for more complex systems.

> See [Style-Dictionary documentation](https://styledictionary.com/info/tokens/#category--type--item) and [Cloudspace Design System](https://cloudscape.design/foundation/visual-foundation/design-tokens/#naming-structure) example on this structure.

| Category | Type    | Item      | Subitem | Interaction (or State) | Example Token Name          |
| -------- | ------- | --------- | ------- | ---------------------- | --------------------------- |
| color    | bg      | primary   |         | hover                  | `--color-bg-primary-hover`  |
| color    | text    | secondary |         |                        | `--color-text-secondary`    |
| border   | radius  | lg        |         |                        | `--border-radius-lg`        |
| spacing  |         | unit      |         |                        | `--spacing-unit`            |
| button   | primary | bg        | hover   |                        | `--button-primary-bg-hover` |

---

## 💡 The 3 things that actually matter

For 99% of components, you only care about:

### 1. **Background color (`bg`)**

### 2. **Text color (`text`)**

### 3. **Border color (`border`)**

Everything else (shadows, spacing, radii…) is standardized.

---

## 🎨 Token System: Simple Mental Model

---

### **Primitives**

Primitives are raw values:

```css
--color-purple-600: #6f53db;
--color-white: #ffffff;
--radius-lg: 8px;
```

- Can be colors, font-sizes, spacings, radius, shadows, etc.
- Building blocks of your design system
- Can be not exclusively linked to your design system, it's a pool of raw values.

See [src/tokens/1 - primitives](./1%20-%20primitives/README.md).

---

### 1️⃣ **Theming tokens** (semantic)

Tokens that describe a specific interface / theme.

**Note:** This is what designers use in tools (Figma, Sketch, etc).
As a developer, you mostly use these indirectly via intents / component tokens.

Examples:

```css
var(--color-primary)     /* main brand color */
var(--color-danger)      /* errors */
var(--color-success)     /* success */
var(--color-neutral)     /* text & lines */
var(--color-inverse)     /* for dark backgrounds */

```

They don't express direct color value, and are used as interface to map theming variables.
They are usually the only ones that get updated during rebranding or theming.

See [src/tokens/2 - semantic](./2%20-%20semantic/README.md).

---

### 2️⃣ **Intent tokens**

Tokens that describe **what a component needs in the UI**. They refer closer to what a designer thinks when building a component.

Example for a button:

```css
--color-border-primary
--color-border-primary-hover

--button-primary-bg-hover
--button-primary-fg
--button-primary-border

```

See [src/tokens/3 - intent](./3%20-%20intent/README.md).

---

Always use:

- semantic tokens **if you’re building a new component**
- component tokens **if you’re editing an existing component**
- tone/type classes **in markup**

---

## 🧭 Quick Cheatsheet

### When building a component:

1. Re-use **intent tokens** if possible:

```css
background: var(--color-bg-primary);
```

2. If not, create new **component tokens**:

```css
background: var(--button-primary-bg);
```

Component tokents are usually mapped to intent tokens. They are used to match specific component needs.
See [designtoken.fyi](https://designtokens.fyi/#/terms/component/)

Sources: [Cloudscape Design System](https://cloudscape.design/)
