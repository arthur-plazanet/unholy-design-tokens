# 🗿 Unholy Design Tokens - A Practical Guide to Design Tokens (Without the Fluff)

<img width="2550" height="920" alt="MacBook Pro 16_ - 6" src="https://github.com/user-attachments/assets/03a1b857-0881-4ad9-b14e-4480b5e181ad" />

See [Figma](https://www.figma.com/design/ALxCJnoWLP4kBiYr59tHqG/useSimpleDesignTokens?node-id=1-5537&t=perH3yNxowfIDyWu-1)

_A brutally clear, developer-friendly design token system using Style Dictionary._

See [Figma](https://www.figma.com/design/ALxCJnoWLP4kBiYr59tHqG/useSimpleDesignTokens?node-id=1-5537&t=perH3yNxowfIDyWu-1)

This project is a playground to try to simplify the concept of design tokens and provide a practical framework for implementing and customize them using Style Dictionary.

## 🏠 Understanding Design Tokens through a House

To represent the concept of design tokens, you can use the following analogies:

→ [**House-Building Analogy** (practical approach)](ANALOGY_HOUSE.md)

---

## Goals:

- Avoid abstraction and provide a short and practical definition of design tokens.
- Propose a clear structure for organizing design tokens.
- Clarify _who owns what_
- Offer a developer-friendly standard for defining and using design tokens, and customizable by project needs.

---

## 📁 Repository Structure

```graphql
/
├─ README.md                ← you're here
├─ ANALOGY_HOUSE.md         ← build a house analogy for design tokens
├─ ANALOGY_I18NEXT.md       ← analogy applied to translations
├─ WHY_THIS_EXISTS.md       ← motivation behind the repo
│
└─ src/
    └─ tokens/
        ├─ README.md                    ← token system overview
        ├─ 1-primitives/                ← raw values (colors, spacing…)
        ├─ 2-semantic/                  ← meaningful roles
        ├─ 3-intent/                    ← purpose/state
        ├─ 4-cube/                      ← layout primitives
        └─ component/                   ← per-component token mapping

```

## 🗂 Token source

Tokens live here:  
👉 [`src/tokens`](./src/tokens)

---

## 📘 Explanations

- ❓ Why this repo exists → [`WHY_THIS_EXISTS.md`](WHY_THIS_EXISTS.md)
- ⚙️ Style Dictionary pipeline → [`STYLE_DICTIONARY.md`](STYLE_DICTIONARY.md)
- i18n analogy → [`ANALOGY_I18NEXT.md`](ANALOGY_I18NEXT.md)
- 🏠 House-building analogy → [`ANALOGY_HOUSE.md`](ANALOGY_HOUSE.md)

---

```md
                         ✝️  UNHOLY DESIGN TOKENS
                 "A house, but programmable"

MATERIALS       PARTS             ROOMS
(Primitives)    (Semantic)        (Intent)
────────────    ─────────────     ─────────────
Raw values:     Meaningful:       Purpose-driven:
- numbers       - surface.card    - success
- spacers       - text.muted      - danger
- raw colors    - spacing.stack   - density modes
- font files    - layout.gutter

```

