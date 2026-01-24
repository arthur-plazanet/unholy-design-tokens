import { Dictionary, Token } from 'style-dictionary'
import { LocalOptions, TransformedToken } from 'style-dictionary/types'
import { getReferences, usesReferences } from 'style-dictionary/utils'
import { toKebab } from './helpers.js'

interface RefToken extends TransformedToken {
  ref?: string[]
}

export function tokenName(token: Token) {
  const attrs = token.attributes
  const path = attrs?.item ? [attrs.category, attrs.type, attrs.item] : token.path
  return path.join('-')
}

// TODO:
export function resolveTokenReferences(
  token: Token,
  options: LocalOptions,
  dictionary: Dictionary,
  privateVar = false,
) {
  const originalValue = token.original?.value
  // if (!shouldOutputReferences(token, options, dictionary)) {
  //   return originalValue != null
  //     ? cssValue(originalValue)
  //     : cssValue(token.value);
  // }

  if (!originalValue) return cssValue(token.value)

  // if (
  //   (originalValueParsed && originalValueParsed.startsWith("var(--")) ||
  //   originalValueParsed.startsWith("calc") ||
  //   originalValueParsed.startsWith("clamp")
  // ) {
  //   ("📟 - cssValue(originalValue) → ", cssValue(originalValue));
  //   return originalValue;
  // }
  if (!usesReferences(originalValue)) return cssValue(token.value)
  if (!shouldOutputReferences(token, options, dictionary)) {
    return rewriteOriginalRefs(originalValue, dictionary.tokens, privateVar)
  } else {
    return cssValue(originalValue)
  }
}
export function refToTokenRefString(ref: RefToken) {
  // Verify if the ref is a style-dictionary reference object pattern or a direct var(--...) string
  const refPath = ref.ref ?? ref.path
  return `{${refPath.join('.')}}`
}

export function refToCssVar(ref: RefToken, privateVar: boolean) {
  return `var(--${privateVar ? '_' : ''}${toKebab(ref.name)})`
}

const cssValue = (v: unknown): string => {
  if (v == null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (typeof v === 'boolean') return v ? 'true' : 'false'
  if (Array.isArray(v)) return v.join(',')
  return JSON.stringify(v)
}

export function rewriteOriginalRefs(originalValue: unknown, dictionaryTokens: Dictionary['tokens'], privateVar: boolean): string | null {
  if (typeof originalValue !== 'string' || !usesReferences(originalValue)) return null

  const refs = getReferences(originalValue, dictionaryTokens)
  let out = originalValue

  for (const ref of refs) {
    out = out.replaceAll(refToTokenRefString(ref), refToCssVar(ref, privateVar))
  }

  return out
}

export function shouldOutputReferences(token: Token, options: LocalOptions, dictionary: Dictionary): boolean {
  const originalValue = token.original?.value
  if (!usesReferences(originalValue)) return false
  const originalValueParsed = cssValue(originalValue)
  if (
    (originalValueParsed && originalValueParsed.startsWith('var(--')) ||
    originalValueParsed.startsWith('calc') ||
    originalValueParsed.startsWith('clamp')
  ) {
    return false
  }

  const { usesDtcg, outputReferences } = options ?? {}
  return typeof outputReferences === 'function'
    ? outputReferences(token as TransformedToken, { dictionary, usesDtcg })
    : Boolean(outputReferences)
}
