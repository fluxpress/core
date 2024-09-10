import path from 'node:path'
import fs from 'fs-extra'
import { SupportDataType, SupportDataTypesMap } from '../fetch/index-types.js'
import { DATA_PATH } from '../constants/path.js'

export async function saveDataAsFile<T extends SupportDataType>(
  dataType: T,
  data: SupportDataTypesMap[T],
) {
  await fs.ensureDir(DATA_PATH)
  await fs.writeJson(path.join(DATA_PATH, `${dataType}.json`), data, {
    encoding: 'utf-8',
  })
}

export async function loadDataFromFile<T extends SupportDataType>(
  dataType: T,
): Promise<SupportDataTypesMap[T]> {
  return await fs.readJson(path.join(DATA_PATH, `${dataType}.json`), {
    encoding: 'utf-8',
  })
}
