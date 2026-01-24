# Cube CSS Layer (Optional)

This folder contains Cube CSS–style abstractions built _on top of_ design tokens.

Cube CSS is not a token layer.  
It is a **mapping layer** that consumes tokens to produce:

- Blocks (components)
- Composition patterns (layout primitives)
- Utility rules (atomic shortcuts)

The goal is to make high-level UI glue fully token-driven and consistent.

---

## Layer Position

Cube lives _after_ design tokens:

```text
Design Tokens → Cube CSS → Components
```

## Naming Schema

Cube CSS tokens follow this pattern:

- **Blocks**

```text
--<component>-<property>-<state?>
```

- **Composition**

```text
--<high-level-recipe/component>-<property>-<state?>
```
