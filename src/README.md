# Style Dictionary Complete Example

This starter project has everything you need to get started.

## How it works

All of the design tokens and assets are in this package. Make any changes to suit your needs. This package has iOS, Android, and web code.

To get started, run

```sh
$ npm install
$ npm run build
```

The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding design tokens, you will have to run this command again to generate the files.

## Tokens

### Primitives

### Examples in Style Dictionary

```jsonc
{
  "color": {
    "arylide-yellow": {
      "500": { "value": "#e3c567" },
    },
    "night": {
      "500": { "value": "#0b0c0c" },
    },
  },
  "spacing": {
    "unit": { "value": "1rem" },
  },
  "border": {
    "radius": {
      "lg": { "value": "8px" },
    },
  },
  "shadow": {
    "sm": { "value": "0 1px 2px rgba(0, 0, 0, 0.05)" },
  },
}
```

### Semantic

## Examples in Style Dictionary

```jsonc
{
  "color": {
    "primary": {
      "500": { "value": "{primitives.color.arylide-yellow.500}" },
    },
    "secondary": {
      "500": { "value": "{primitives.color.night.500}" },
    },
  },
  "spacing": {
    "multiplier": { "value": "1.5" },
    "xs": {
      "value": "calc({primitives.spacing.unit} * {semantic.spacing.multiplier} * 0.5)",
    },
    "md": {
      "value": "calc({primitives.spacing.unit} * {semantic.spacing.multiplier} * 1)",
    },
  },
}
```

### Intent

## Example

```jsonc
{
  "color": {
    "success": {
      "surface": { "value": "{semantic.color.surface.positive}" },
      "border": { "value": "{semantic.color.border.positive}" },
      "text": { "value": "{semantic.color.text.positive}" },
    },
  },
}
```
