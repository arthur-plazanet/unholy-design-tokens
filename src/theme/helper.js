// helper.js
import { generateHeader, generateSubheader } from '../utils/template.js'
export { generateThemeContent }

function generateThemeContent(tokens, scope = 'public') {
  let content = ''

  let currentCategory = null
  let usedSubsections = new Set() // resets per category

  for (const t of tokens) {
    const category = t?.category ?? null

    // New category → print header and reset subsection tracking
    if (category && category !== currentCategory) {
      currentCategory = category
      usedSubsections = new Set()
      content += generateHeader(category)
    }

    // Optional subsection (opt-in per token)
    const subsection = t?.subsection
    if (subsection && !usedSubsections.has(subsection)) {
      usedSubsections.add(subsection)
      content += generateSubheader(subsection)
    }

    const rawValue = t.value

    if (scope === 'public') {
      content += `  ${t.publicName}: ${rawValue};\n`
    } else {
      content += `  ${t.privateName}: var(${t.publicName}, ${rawValue});\n`
    }
  }

  return content
}
