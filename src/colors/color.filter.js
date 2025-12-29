export function isPrimitiveColor(token) {
  if (token.attributes?.tokenTier)
    return (
      token.attributes?.tokenTier === "primitive" &&
      token.attributes?.category === "color"
    );
}

export function isSemanticColor(token) {
  return (
    token.attributes?.tokenTier === "semantic" &&
    token.attributes?.category === "color"
  );
}

export function isIntentColor(token) {
  return (
    token.attributes?.tokenTier === "intent" &&
    token.attributes?.category === "color"
  );
}

export function filterThemeTokens(token) {
  return isPrimitiveColor(token);
}
