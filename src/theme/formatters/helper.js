import {
  generateSubheader,
  generateSectionHeader,
} from "../../utils/template.js";

export { themeSubHeader, themeSectionHeader, generateThemeContent };

function themeSubHeader(type) {
  const subsectionHeader = generateSubheader(type);
  if (subsectionHeader) {
    return `\n${subsectionHeader}`;
  }
}

function themeSectionHeader(category) {
  const sectionHeader = generateSectionHeader(category);

  if (sectionHeader) {
    return `\n${sectionHeader}`;
  }
}

function generateThemeContent(tokens, scope = "public") {
  let content = "";
  const usedCategories = new Set();
  const usedTypes = new Set();

  tokens.forEach((t) => {
    console.log("📟 - t → ", t.category);
    const category = t?.category;
    if (category && !usedCategories.has(category)) {
      usedCategories.add(category);
      content += themeSectionHeader(category);
    }
    if (t?.type && !usedTypes.has(t.type)) {
      usedTypes.add(t.type);
      content += themeSubHeader(t.type);
    }
    if (scope === "public") {
      content += `\n ${t.publicName}: ${t.original ? t.original.value : t.value};`;
    } else {
      content += `\n ${t.privateName}: var(${t.publicName}, ${t.original ? t.original.value : t.value});`;
    }
    // content += `\n  ${scope === "public" ? t.publicName : t.privateName}: ${
    //   t.original ? t.original.value : t.value
    // };`;
  });
  return content;
}
