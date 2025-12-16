export { generateSectionHeader };

function generateSectionHeader(type) {
  return `${
    type
      ? `\n/* -------------------------------------------------- */\n/* ${capitalizeFirstLetter(
          type
        )} */\n/* -------------------------------------------------- */`
      : ''
  }`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
