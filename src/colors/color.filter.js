export function isPrimitiveColor(token) {
  if (token.attributes?.tokenLevel)
    return (
      token.attributes?.tokenLevel === 'primitive' &&
      token.attributes?.category === 'color'
    );
}

export function isSemanticColor(token) {
  return (
    token.attributes?.tokenLevel === 'semantic' &&
    token.attributes?.category === 'color'
  );
}

export function isIntentColor(token) {
  return (
    token.attributes?.tokenLevel === 'intent' &&
    token.attributes?.category === 'color'
  );
}

export function filterThemeTokens(token) {
  return isPrimitiveColor(token);
}
