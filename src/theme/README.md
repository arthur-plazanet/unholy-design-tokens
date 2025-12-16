# 🎚️ **Theme Tokens: Public vs Private Variables**

*Why two layers of theme tokens exist, how they work, and which one you should modify.*

This repo generates **two versions** of theme variables:

- **Public Theme Tokens** → meant for *outside consumers*
- **Private Theme Tokens** → meant for *internal component use*

Understanding the difference keeps your design system:

✔ safe

✔ overridable

✔ stable

✔ predictable

Let’s break it down.

---

# 🟣 **1. Public Theme Tokens (`-token`)**

These are the **official, documented** variables that consumers *are allowed* to override.

Example:

```css
:root {
  --space-md: 1rem;
  --color-bg-default: #ffffff;
  --text-body-size: 1rem;
}

```

### ✔ Purpose

- Provide a **stable API** for theming
- Let applications or customer brands override design tokens
- Expose “slot” variables, not internal details

### ✔ Consumers can override:

```css
:root {
  --color-bg-default: #fef7ff; /* custom brand color */
}

```

### 🛑 Consumers *should not* override:

- component-specific tokens
- conditional tokens
- computed variables
- values derived from multiple dependencies

Public tokens are your **surface area**.

---

# 🔵 **2. Private Theme Tokens (`-_token`)**

These exist **only inside the design system**.

Generated like this:

```css
--_space-md: var(--space-md, 1rem);
--_color-bg-default: var(--color-bg-default, #ffffff);
--_text-body-size: var(--text-body-size, clamp(...));

```

This structure follows Lea Verou’s pattern:

https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/

### ✔ Private variables are *always safe*

Even if a consumer overrides a public variable incorrectly, components still resolve safely.

Example:

```css
background: var(--_color-bg-default);

```

### ✔ Developers should **ONLY** use private tokens inside components

Never use:

```css
background: var(--color-bg-default);  /* ❌ no */

```

Always use:

```css
background: var(--_color-bg-default); /* ✔ correct */

```

### ✔ Why?

Because private variables:

- lock in fallback values
- isolate component behavior from breaking changes
- prevent invalid overrides from crashing styling
- are stable even if public tokens change

---

# 🌀 **How Public → Private Works**

Each public token:

```css
--text-body-size: 1rem;

```

Produces a private counterpart:

```css
--_text-body-size: var(--text-body-size, 1rem);

```

This means:

- if a theme provides a custom `-text-body-size`, it’s used
- otherwise, fallback = design system default

Exactly what you want.

---

# 🧠 **Why Not Use Public Tokens Inside Components?**

Because public tokens are:

- overrideable
- unstable
- potentially missing
- brand-controlled

Private tokens are:

- resolved
- safe
- internal
- consistent

### Components use internal safety

### Apps override external knobs

---

# 🧩 **Example: Button Token Flow**

**Public:**

```css
--button-primary-bg: var(--color-brand-primary);
--button-primary-radius: 6px;

```

**Private:**

```css
--_button-primary-bg: var(--button-primary-bg, var(--_color-brand-primary));
--_button-primary-radius: var(--button-primary-radius, 6px);

```

**Component:**

```css
button.primary {
  background: var(--_button-primary-bg);
  border-radius: var(--_button-primary-radius);
}

```

### If a consumer overrides:

```css
:root {
  --button-primary-bg: hotpink;
}

```

→ component updates correctly

→ fallback is preserved

→ nothing breaks

---

# 🧩 **Why Two Levels Are Necessary**

| Layer | Who uses it | Purpose |
| --- | --- | --- |
| **Public (`--token`)** | consumers | override, theme, brand |
| **Private (`--_token`)** | components | stable internal contract |
| **Component tokens** | DS devs | button/card/input internals |
| **Semantic tokens** | DS designers | meaning-based mapping |
| **Primitives** | DS designers | raw values |

This hierarchy ensures:

- **external flexibility**
- **internal stability**

Exactly what a scalable design system needs.

---

# 🛠 Your Custom Formatters

Your Style Dictionary setup generates:

### **public-theme.css**

```css
:root {
  --space-md: 1rem;
  --text-body-size: 1rem;
  --color-bg-default: #fff;
}

```

### **private-theme.css**

```css
:root {
  --_space-md: var(--space-md, 1rem);
  --_text-body-size: var(--text-body-size, 1rem);
  --_color-bg-default: var(--color-bg-default, #fff);
}

```

Nothing else in your build system needs to know how public & private vars relate.

Components only consume **private** vars.

Component libraries only expose **public** vars.

---

# 🧪 TL;DR Cheat Sheet

| Thing | Use Public? | Use Private? | Notes |
| --- | --- | --- | --- |
| Apps / Consumers | ✔ yes | ❌ no | override `--token` |
| DS Components | ❌ no | ✔ yes | use `--_token` |
| Themes | ✔ yes | ❌ no | theme overrides go to public vars |
| Fallbacks | automatic | automatic | thanks to var(--token, fallback) |
