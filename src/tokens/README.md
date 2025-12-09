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

### Why?

Because if we change a color later, or add themes, or update branding —

**we update 1 token instead of 400 files.**

1 Token = **1 variable for design**.

---

# 💡 The 3 things that actually matter

For 99% of components, you only care about:

### 1. **Background color (`bg`)**

### 2. **Text color (`text`)**

### 3. **Border color (`border`)**

Everything else (shadows, spacing, radii…) is standardized.

---

# 🎨 Token System: Simple Mental Model

---

## **Primitives**

Primitives are raw values:

```css
--color-purple-600: #6f53db;
--color-white: #ffffff;
--radius-lg: 8px;
```

These are the building blocks of your design system.
See [src/tokens/1 - primitives](./1%20-%20primitives/README.md).

---

## 1️⃣ **Theming tokens** (semantic)

Tokens that describe a specific interface / theme.

> [!NOTE] This is what designers use in tools (Figma, Sketch, etc).
> As a developer, you mostly use these indirectly via intents / component tokens.

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

---

## 2️⃣ **Intent tokens**

Tokens that describe **what a component needs**.

Example for a button:

```css
--button-primary-bg
--button-primary-bg-hover
--button-primary-fg
--button-primary-border

```

These are **what components actually use**.

---

# 🧪 Concrete Example (Buttons)

### HTML:

```html
<button class="rt-button tone-brand type-primary">Save</button>
```

### Component CSS:

```css
.rt-button {
  background: var(--button-primary-bg);
  color: var(--button-primary-fg);
  border-color: var(--button-primary-border);
}
```

### Result:

- you don’t write colors
- you don’t write hex
- you don’t duplicate logic
- **you only combine tone + type**

---

# 🧱 Why this is good for developers

### ✔ No more hunting for hex values

### ✔ Themes (dark mode, rebranding) are free

### ✔ Consistency across apps

### ✔ Easy to refactor

### ✔ Easy to debug (everything is a variable)

### ✔ Easy for newcomers (only bg/fg/border matter)

---

# 🚫 What NOT to do

❌ Don’t hardcode hex

❌ Don’t use Tailwind color utilities (`bg-purple-600`)

❌ Don’t reference primitive colors directly

❌ Don’t override component tokens in the app

Always use:

- semantic tokens **if you’re building a new component**
- component tokens **if you’re editing an existing component**
- tone/type classes **in markup**

---

# 🧭 Quick Cheatsheet

### When building a component:

Use **component tokens**:

```css
background: var(--button-primary-bg);
```

### When choosing a color family:

Use **semantic** tokens:

```css
var(--color-danger)
var(--color-success)

```

### When writing HTML:

Pick **tone + type**:

```html
class="tone-danger type-ghost"
```

---

# ⚡ TL;DR for Developers

- **Tokens = CSS variables for design**
- You only need to worry about **bg / fg / border**
- HTML uses **tone + type classes**
- Components use **component tokens**
- Semantic names keep everything consistent

Everything else is handled automatically.

---

If you want, I can also create:

✨ A **1-page cheat-card** (for onboarding)

✨ A **wallboard diagram**

✨ A **video-style storyboard** showing the flow bg→token→class→component

Just tell me!
