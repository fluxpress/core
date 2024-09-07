import path from 'node:path'
import fs from 'fs-extra'

export async function saveDataAsFile<T>(filePath: string, data: T) {
  await fs.ensureDir(path.dirname(filePath))
  await fs.writeJson(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile<T>(filePath: string): Promise<T> {
  return await fs.readJson(filePath, { encoding: 'utf-8' })
}
