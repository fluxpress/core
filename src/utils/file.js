import fs from 'fs-extra'
import { DATA_DIR } from '../constants/project'

export async function saveDataAsFile(filePath, data) {
  await fs.ensureDir(DATA_DIR)
  await fs.writeJSON(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath) {
  return await fs.readJson(filePath, { encoding: 'utf-8' })
}
