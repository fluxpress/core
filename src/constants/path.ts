import path from 'node:path'
import { findUp } from 'find-up-simple'

// app root
export const APP_ROOT_PATH = path.dirname(await findUp('package.json'))

// config
export const FLUX_PRESS_CONFIG_PATH = path.join(
  APP_ROOT_PATH,
  'fluxpress.config.js',
)

// data
export const DATA_PATH = path.join(APP_ROOT_PATH, 'data')
export const DATA_PATH__ISSUES = path.join(DATA_PATH, 'issues.json')
