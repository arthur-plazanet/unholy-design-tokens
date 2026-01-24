import { Token } from 'style-dictionary'

export function isPrimitiveColor(token: Token) {
  if (token.attributes?.tokenTier)
    return token.attributes?.tokenTier === 'primitive' && token.attributes?.category === 'color'
}

export function isSemanticColor(token: Token) {
  return token.attributes?.tokenTier === 'semantic' && token.attributes?.category === 'color'
}

export function isIntentColor(token: Token) {
  return token.attributes?.tokenTier === 'intent' && token.attributes?.category === 'color'
}

export function isPoolColor(token: Token) {
  return token.attributes?.tokenTier === 'color-pool' && token.attributes?.category === 'color-pool'
}

export function isColorToken(token: Token) {
  return (
    isPoolColor(token) || isPrimitiveColor(token) || isSemanticColor(token) || isIntentColor(token)
  )
}

export function filterThemeTokens(token: Token) {
  return isPrimitiveColor(token)
}
