#!/usr/bin/env node

import { readFileSync } from 'node:fs'

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url)),
)

console.log(`Current @fluxpress/core version: ${pkg.version}`)
