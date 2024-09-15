import test from 'ava'

import { APP_ROOT_PATH } from './path.js'

test('APP_ROOT_PATH', (t) => {
  t.is(APP_ROOT_PATH, process.cwd())
})
