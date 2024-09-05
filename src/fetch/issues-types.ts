import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'

import { DataBase } from './base-types.js'

export type Comment =
  RestEndpointMethodTypes['issues']['listComments']['response']['data'][number]

export type Issue = {
  comments_list: Comment[]
} & RestEndpointMethodTypes['issues']['listForRepo']['response']['data'][number]

export type Label =
  RestEndpointMethodTypes['issues']['listLabelsForRepo']['response']['data'][number]

export type Milestone =
  RestEndpointMethodTypes['issues']['listMilestones']['response']['data'][number]

export interface DataIssues extends DataBase {
  issues: Issue[]
  labels: Label[]
  milestones: Milestone[]
}
