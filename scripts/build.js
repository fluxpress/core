process.env.NODE_ENV = 'production'

import { remove } from 'fs-extra'
import { runCommand } from './utils.js'

await remove('dist')
await runCommand('tsc')
await runCommand('rollup', ['--config'])
