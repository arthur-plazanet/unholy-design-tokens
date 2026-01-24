#!/usr/bin/env node

import { program } from 'commander'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildStyleDictionary } from '../scripts/build-style-dictionary'

program
  .name('build-tokens')
  .description('Build and copy tokens to the destination folder.')
  .argument('[dir]', 'target directory', './build/')
  .option('-f, --force', 'overwrite existing files')
  .action(async (dir, options) => {
    const targetDir = path.resolve(process.cwd(), dir)

    // 1) temp dir
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tokens-'))

    // 2) build Style Dictionary into temp
    await buildStyleDictionary(tmpDir)

    // 3) copy result to target
    await fs.mkdir(targetDir, { recursive: true })
    await fs.cp(tmpDir, targetDir, {
      recursive: true,
      force: options.force ?? true,
    })

    // 4) cleanup
    await fs.rm(tmpDir, { recursive: true, force: true })
  })

program.parse()
