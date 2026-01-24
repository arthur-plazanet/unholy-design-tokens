# 📂 Intent Tokens

Intent tokens translate UI states like "success" or "danger" (designer language) into consistent visual.

They answer the question:

> “Why am I using it?”

This is the **developer-facing API** for stateful components.

```css
--color-bg-primary: var(--color-primary-500); /* will resolve to semantic var */
--color-bg-secondary: var(--color-secondary-500); /* will resolve to semantic var */
/* ... */
```

## Why to use intent tokens

- Create a stable interface for components that need to convey UI meaning and semantic (see [_About HTML semantics and front-end architecture_](https://nicolasgallagher.com/about-html-semantics-front-end-architecture/)).
- They do not change with themes (light/dark/brand), only with UX meaning.
- You don't think in term of color anymore (see [🏠 House-Building Analogy](../../../ANALOGY_HOUSE.md)).

## 💡 The 3 things that actually matter

For 99% of components, you only care about:

### 1. **Background color (`bg`)**

### 2. **Text color (`text`)**

### 3. **Border color (`border`)**

Everything else (shadows, spacing, radii…) is usually standardized in the previous tiers.

## How intent tokens are (or can be) defined

- **Usually reference semantic**
- **Names reflect UX meaning, not visual result**
- **Schema: `purpose.priority.property` or `purpose.priority.property.state`**

## Next Steps

(Optional) you can create specific token as related to [CUBE CSS](https://cube.fyi/) based on these intent tokens. See [src/tokens/4 - (OPTIONAL) cube](<../custom/4%20-%20(OPTIONAL)%20cube%20css/README.md>)
