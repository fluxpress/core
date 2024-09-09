import 'dotenv/config'
import path from 'node:path'
import fs from 'fs-extra'

import { logger } from './logger.js'
import { FluxPressConfig } from './config-types.js'
import { APP_ROOT_PATH } from '../constants/path.js'

export async function readFluxPressConfig() {
  const configFile = 'fluxpress.config.js'
  const configPath = path.join(APP_ROOT_PATH, configFile)

  if (!(await fs.exists(configPath))) {
    logger.error(`未找到配置文件：${configFile}`)
    return
  }

  const fluxpressConfig: FluxPressConfig = (await import(configPath)).default
  if (!fluxpressConfig) {
    logger.error(`请填写配置文件：${configFile}`)
    return
  }

  return fluxpressConfig
}

export async function readFluxPressThemeConfig<ThemeConfig>() {
  const { theme } = await readFluxPressConfig()
  if (!theme) return

  const themeConfigFile = `fluxpress.config.${theme}.js`
  const themeConfigPath = path.join(APP_ROOT_PATH, themeConfigFile)

  if (!(await fs.pathExists(themeConfigPath))) {
    logger.error(`未找到主题配置文件：${themeConfigFile}`)
    return
  }

  const fluxpressThemeConfig: ThemeConfig = (await import(themeConfigPath))
    .default
  if (!fluxpressThemeConfig) {
    logger.error(`请填写主题配置文件：${themeConfigFile}`)
    return
  }

  return fluxpressThemeConfig
}

export function readGitHubToken() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    logger.warn(
      `
未找到 GITHUB_TOKEN，将很快超过 GitHub API 请求速录限制。

开发环境下请在根目录下创建 .env 文件，
然后写入 GITHUB_TOKEN=your-github-token，我们会自动读取它。
❗️注意：切勿将 .env 文件提交到远程仓库，将它添加到 .gitignore。

在 GitHub Action 中，通过配置环境变量使用 GitHub Actions 内嵌的 Token，
它像这样：
- name: Your Step
  env:
    GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }} # 使用 GitHub Actions 内嵌的 Token
  run: npm run xxx
      `,
    )
  }
  return GITHUB_TOKEN
}
