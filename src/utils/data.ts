import path from 'node:path'
import { ensureDir, writeJson, readJson } from 'fs-extra'

export async function saveDataAsFile(filePath: string, data) {
  await ensureDir(path.dirname(filePath))
  await writeJson(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath: string) {
  return await readJson(filePath, { encoding: 'utf-8' })
}
