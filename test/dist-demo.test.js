import test from 'ava'

import { APP_ROOT_PATH } from '../dist/index.js'

test('test dist demo', (t) => {
  t.is(APP_ROOT_PATH, process.cwd())
})
