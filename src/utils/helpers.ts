export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toKebab(s: string | number): string {
  return String(s)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_.]/g, "-")

    .toLowerCase();
}
