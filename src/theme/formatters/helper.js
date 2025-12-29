import { generateSubheader, generateHeader } from "../../utils/template.js";

export { themeSubHeader, themeSectionHeader, generateThemeContent };

function themeSubHeader(type) {
  const subsectionHeader = generateSubheader(type);
  if (subsectionHeader) {
    return `\n${subsectionHeader}`;
  }
}

function themeSectionHeader(category) {
  const sectionHeader = generateHeader(category);

  if (sectionHeader) {
    return `${sectionHeader}`;
  }
}

function generateThemeContent(tokens, scope = "public") {
  let content = "";
  const usedCategories = new Set();
  const usedTypes = new Set();

  tokens.forEach((t) => {
    const category = t?.category;
    if (category && !usedCategories.has(category)) {
      usedCategories.add(category);
      content += generateHeader(category);
    }
    if (t?.type && !usedTypes.has(t.type)) {
      usedTypes.add(t.type);
      content += generateSubheader(t.type);
    }
    content += "  ";

    if (scope === "public") {
      content += `${t.publicName}: ${t.original ? t.original.value : t.value};\n`;
    } else {
      content += `${t.privateName}: var(${t.publicName}, ${t.original ? t.original.value : t.value});\n`;
    }
  });
  return content;
}
