import 'dotenv/config'
import { ensureDir, writeJSON, readJson, exists } from 'fs-extra'

import { DATA_DIR, FLUX_PRESS_CONFIG_PATH } from '../constants/project.js'
import fluxpressConfigTemplate from '../templates/fluxpress.config.template.json'

export async function readFluxPressConfig() {
  if (!(await exists(FLUX_PRESS_CONFIG_PATH))) {
    await writeJSON(FLUX_PRESS_CONFIG_PATH, fluxpressConfigTemplate, {
      encoding: 'utf-8',
    })
    console.error(`[FluxPress] 尚未配置 ${FLUX_PRESS_CONFIG_PATH}`)
    return null
  }
  const fluxpressConfig = await readJson(FLUX_PRESS_CONFIG_PATH, {
    encoding: 'utf-8',
  })
  if (!fluxpressConfig.github.owner || !fluxpressConfig.github.repo) {
    console.error(`[FluxPress] 尚未配置 ${FLUX_PRESS_CONFIG_PATH}`)
    return null
  }
  return fluxpressConfig
}

export async function saveDataAsFile(filePath, data) {
  await ensureDir(DATA_DIR)
  await writeJSON(filePath, data, { encoding: 'utf-8' })
}

export async function loadDataFromFile(filePath) {
  return await readJson(filePath, { encoding: 'utf-8' })
}
