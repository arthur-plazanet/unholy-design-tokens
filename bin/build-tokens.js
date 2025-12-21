#!/usr/bin/env node

import { execSync } from "node:child_process";
import path, { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

var cwd = path.resolve();
console.log("📟 - path → ", path);
console.log("📟 - path.resolve() → ", path.resolve());

// Path where the command was executed from (the user’s project root)
const source = resolve(cwd, "./build");
// Destination path
const destination = resolve(cwd, "../../css-fun/build");

try {
  execSync("pnpm build");
  execSync("ls -la build/css");
  // Copy using cp
  execSync(`cp -r "${source}" "${destination}"`);
  console.log(`✅ Theme file copied to: ${destination}`);
} catch (error) {
  console.error("❌ Failed to copy theme file:", error.message);
  process.exit(1);
}
