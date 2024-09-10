import { SupportDataType } from '../fetch/index-types.js'

export interface FluxPressConfig {
  github: {
    owner: string
    repo: string
    need_data: SupportDataType[]
  }
  theme: string
}
