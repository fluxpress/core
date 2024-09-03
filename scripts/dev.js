process.env.NODE_ENV = 'development'

import { remove } from 'fs-extra/esm'
import { runCommand } from './utils.js'

await remove('dist')
await runCommand('rollup', ['--config', '--watch'])
