import { ensureDir, writeJSON, readJson } from 'fs-extra'
import { DATA_DIR } from '../constants/project'

export async function saveDataAsFile(filePath, data) {
  await ensureDir(DATA_DIR)
  await writeJSON(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath) {
  return await readJson(filePath, { encoding: 'utf-8' })
}
