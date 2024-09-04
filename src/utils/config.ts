import 'dotenv/config'
import path from 'node:path'
import { exists } from 'fs-extra'

import { FLUX_PRESS_CONFIG_PATH } from '../constants/path.js'

export interface FluxPressConfig {
  github: {
    owner: string
    repo: string
  }
}

export async function readFluxPressConfig() {
  if (!(await exists(FLUX_PRESS_CONFIG_PATH))) {
    console.error(
      `[FluxPress] 未找到配置文件： ${path.basename(FLUX_PRESS_CONFIG_PATH)}`,
    )
    return
  }

  const fluxpressConfig: FluxPressConfig = (
    await import(FLUX_PRESS_CONFIG_PATH)
  ).default

  if (!fluxpressConfig) {
    console.error(
      `[FluxPress] 请填写配置文件： ${path.basename(FLUX_PRESS_CONFIG_PATH)}`,
    )
    return
  }

  return fluxpressConfig
}

export function readGitHubToken() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN
  if (!GITHUB_TOKEN) {
    console.warn(
      `[FluxPress] 未找到 GITHUB_TOKEN，将很快超过 GitHub API 请求速录限制。`,
    )
    console.warn('[FluxPress]')
    console.warn('[FluxPress] 开发环境下请在根目录下创建 .env 文件，')
    console.warn(
      '[FluxPress] 然后写入 GITHUB_TOKEN=your-github-token，我们会自动读取它。',
    )
    console.warn(
      '[FluxPress] ！！！切勿将 .env 文件提交到远程仓库，将它添加到 .gitignore。',
    )
    console.warn('[FluxPress]')
    console.warn(
      '[FluxPress] 在 GitHub Action 中，通过配置环境变量使用 GitHub Actions 内嵌的 Token',
    )
    console.warn('[FluxPress] 它像这样：')
    console.warn('[FluxPress] - name: Your Step')
    console.warn('[FluxPress]   env:')
    console.warn(
      '[FluxPress]     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # 使用 GitHub Actions 内嵌的 Token',
    )
    console.warn('[FluxPress]   run: npm run xxx')
  }
  return GITHUB_TOKEN
}
