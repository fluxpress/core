process.env.NODE_ENV = 'production'

import { remove } from 'fs-extra/esm'
import { runCommand } from './utils.js'

await remove('dist')
await runCommand('rollup', ['--config'])
