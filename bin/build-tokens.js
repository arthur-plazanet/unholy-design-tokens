#!/usr/bin/env node

import path from "node:path";
import { program } from "commander";
import fs from "node:fs/promises";
import os from "node:os";
import { buildStyleDictionary } from "../scripts/build-style-dictionary.js";

program
  .name("build-tokens")
  .description("Build and copy tokens to the destination folder.")
  .argument("[dir]", "target directory", "./build/")
  .option("-f, --force", "overwrite existing files", true)
  .action(async (dir, options) => {
    const targetDir = path.resolve(process.cwd(), dir);

    // 1) temp dir
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "tokens-"));

    // 2) build Style Dictionary into temp
    await buildStyleDictionary(tmpDir);

    // 3) copy result to target
    await fs.mkdir(targetDir, { recursive: true });
    await fs.cp(tmpDir, targetDir, {
      recursive: true,
      force: options.force,
    });

    // 4) cleanup
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

program.parse();

// console.log("📟 - program → ", program.commands[0].options);

// const options = program.opts();
// const flag = options.flag ? "Flag is present." : "Flag is not present.";

// console.log("Flag:", `${flag}`);
// console.log("Custom:", `${options.custom}`);

// // Destination path
// const destination = resolve(cwd, "../../css-fun/");
// console.log("📟 - destination → ", destination);

// try {
//   execSync("pnpm build-tokens");
//   execSync("ls -la build/");
//   // Copy using cp
//   execSync(`cp -r "${source}" "${destination}"`);
//   console.log(`✅ Theme file copied to: ${destination}`);
// } catch (error) {
//   console.error("❌ Failed to copy theme file:", error.message);
//   process.exit(1);
// }
