export { generateSectionHeader, generateSubheader };

function generateBlock(title, separator, indent = "") {
  return (
    `\n${indent}${separator}\n` +
    `${indent}/* ${title} */\n` +
    `${indent}${separator}`
  );
}

const headerSeparator =
  "/* ---------------------------------------------------- */";

const subheaderSeparator = "  /* -------------------- */";

function generateSectionHeader(type) {
  if (!type) return "";

  let title = `                       ${capitalizeFirstLetter(type)}                         `;

  return (
    "\n" +
    generateBlock(
      title,
      "/* ---------------------------------------------------- */",
      "",
    )
  );
}

function generateSubheader(subtype) {
  if (!subtype) return "";

  return generateBlock(
    capitalizeFirstLetter(subtype),
    "/* -------------------- */",
    "  ",
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
