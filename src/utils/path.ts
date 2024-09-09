import 'dotenv/config'
import fs from 'fs-extra'
import path from 'path'

import { APP_ROOT_PATH } from '../constants/path.js'
import { readFluxPressConfig } from './config.js'

/**
 * 根据 fluxpress.config.js 指定的 theme，获取主题路径。
 * 当 `NODE_ENV === 'development'` 情况下返回 APP_ROOT_PATH，这应用于 **主题开发** 场景
 */
export async function readThemePath() {
  if (process.env.NODE_ENV === 'development') return APP_ROOT_PATH

  const { theme } = await readFluxPressConfig()
  if (!theme) return

  const manualThemePath = path.join(APP_ROOT_PATH, 'themes', theme)
  if (await fs.pathExists(manualThemePath)) return manualThemePath

  const installOfficialThemePath = path.join(
    APP_ROOT_PATH,
    'node_modules',
    '@fluxpress',
    `theme-${theme}`,
  )
  if (await fs.pathExists(installOfficialThemePath))
    return installOfficialThemePath

  const installCommunityThemePath = path.join(
    APP_ROOT_PATH,
    'node_modules',
    `fluxpress-theme-${theme}`,
  )
  if (await fs.pathExists(installCommunityThemePath))
    return installCommunityThemePath
}
