import { Octokit } from 'octokit'

import { GITHUB_REST_API_VERSION } from '../constants/app.js'
import { readFluxPressConfig, readGitHubToken } from '../utils/config.js'
import { FluxPressConfig } from '../utils/config-types.js'
import { Comment, Issue, DataIssues, Label, Milestone } from './issues-types.js'
import packageJson from '../../package.json' assert { type: 'json' }

async function getIssues(
  fluxpressConfig: FluxPressConfig,
  octokit: Octokit,
): Promise<Issue[]> {
  const issues: Issue[] = []

  const issuesIterator = octokit.paginate.iterator(
    octokit.rest.issues.listForRepo,
    {
      owner: fluxpressConfig.github.owner,
      repo: fluxpressConfig.github.repo,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
      },
    },
  )
  for await (const { data: currentPageIssuesRaw } of issuesIterator) {
    const currentPageIssues: Issue[] = currentPageIssuesRaw.map((issueRaw) => ({
      ...issueRaw,
      comments_list: null,
    }))
    for (let i = 0; i < currentPageIssues.length; i++) {
      const comments_list: Comment[] = []
      const commentsDataIterator = octokit.paginate.iterator(
        octokit.rest.issues.listComments,
        {
          owner: fluxpressConfig.github.owner,
          repo: fluxpressConfig.github.repo,
          issue_number: currentPageIssues[i].number,
          per_page: 100,
          headers: {
            'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
          },
        },
      )
      for await (const {
        data: currentPageCommentsData,
      } of commentsDataIterator) {
        comments_list.push(...currentPageCommentsData)
      }
      currentPageIssues[i].comments_list = comments_list
    }
    issues.push(...currentPageIssues)
  }

  return issues
}

async function getLabels(
  fluxpressConfig: FluxPressConfig,
  octokit: Octokit,
): Promise<Label[]> {
  const labels: Label[] = []

  const labelsIterator = octokit.paginate.iterator(
    octokit.rest.issues.listLabelsForRepo,
    {
      owner: fluxpressConfig.github.owner,
      repo: fluxpressConfig.github.repo,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
      },
    },
  )
  for await (const { data } of labelsIterator) {
    labels.push(...data)
  }

  return labels
}

async function getMilestones(
  fluxpressConfig: FluxPressConfig,
  octokit: Octokit,
): Promise<Milestone[]> {
  const milestones: Milestone[] = []

  const milestonesIterator = octokit.paginate.iterator(
    octokit.rest.issues.listMilestones,
    {
      owner: fluxpressConfig.github.owner,
      repo: fluxpressConfig.github.repo,
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
      },
    },
  )
  for await (const { data } of milestonesIterator) {
    milestones.push(...data)
  }

  return milestones
}

export async function fetchDataIssues(): Promise<DataIssues> {
  const fluxpressConfig = await readFluxPressConfig()
  if (!fluxpressConfig) return

  const GITHUB_TOKEN = readGitHubToken()
  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  const data_issues: DataIssues = {
    version: packageJson.version,
    metadata: {
      fetch_time: new Date().toLocaleString(),
      github: {
        owner: fluxpressConfig.github.owner,
        repo: fluxpressConfig.github.repo,
      },
    },
    issues: await getIssues(fluxpressConfig, octokit),
    labels: await getLabels(fluxpressConfig, octokit),
    milestones: await getMilestones(fluxpressConfig, octokit),
  }

  return data_issues
}
