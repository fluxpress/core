import test from 'ava'

import { APP_ROOT_PATH } from '../src/index.js'

test('test common demo', (t) => {
  t.is(APP_ROOT_PATH, process.cwd())
})
