import { Octokit } from 'octokit'

import { GITHUB_REST_API_VERSION } from '../constants/project.js'
import { readFluxPressConfig, readGitHubToken } from '../utils/config.js'

export async function fetchIssues() {
  const fluxpressConfig = await readFluxPressConfig()
  if (!fluxpressConfig) return

  const GITHUB_TOKEN = readGitHubToken()

  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  const issues = []
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
  for await (const { data: currentPageIssues } of issuesIterator) {
    for (let i = 0; i < currentPageIssues.length; i++) {
      const comments = []
      const commentsIterator = octokit.paginate.iterator(
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
      for await (const { data: currentPageComments } of commentsIterator) {
        comments.push(...currentPageComments)
      }
      // currentPageIssues[i].comments_data = comments
    }
    issues.push(...currentPageIssues)
  }

  return issues
}
