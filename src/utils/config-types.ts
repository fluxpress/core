import { SupportDataType } from '../fetch/index-types.js'

export interface FluxPressConfig {
  github: {
    owner: string
    repo: string
  }
  theme: string
}

export interface ThemeConfigBase {
  need_data: SupportDataType[]
}
