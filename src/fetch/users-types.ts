import { Endpoints } from '@octokit/types'

import { DataBase } from './base-types.js'

export interface Users extends DataBase {
  user: Endpoints['GET /user']['response']['data']
  social_accounts: Endpoints['GET /user/social_accounts']['response']['data']
  followers: Endpoints['GET /user/followers']['response']['data']
}
