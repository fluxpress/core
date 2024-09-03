import path from 'node:path'
import { ensureDir, writeJSON, readJson } from 'fs-extra/esm'

import { DATA_DIR } from '../constants/project'

export async function readFluxPressConfig() {
  return await readJson(path.join(process.cwd(), 'fluxpress.config.json'), {
    encoding: 'utf-8',
  })
}

export async function saveDataAsFile(filePath, data) {
  await ensureDir(DATA_DIR)
  await writeJSON(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath) {
  return await readJson(filePath, { encoding: 'utf-8' })
}
