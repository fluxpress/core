import path from 'node:path'
import { findUp } from 'find-up-simple'

// app root
export const APP_ROOT_PATH = path.dirname((await findUp('package.json')) ?? '')

// output
export const OUTPUT_PATH = path.join(APP_ROOT_PATH, 'public')

// data
export const DATA_PATH = path.join(APP_ROOT_PATH, 'data')
