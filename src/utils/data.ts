import path from 'node:path'
import fs from 'fs-extra'

export async function saveDataAsFile(filePath: string, data) {
  await fs.ensureDir(path.dirname(filePath))
  await fs.writeJson(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath: string) {
  return await fs.readJson(filePath, { encoding: 'utf-8' })
}
