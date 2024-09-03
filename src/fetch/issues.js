import 'dotenv/config'
import { Octokit } from 'octokit'

import { GITHUB_REST_API_VERSION } from '../constants/project'
import { readFluxPressConfig } from '../utils/file'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const fluxpressConfig = await readFluxPressConfig()

export async function fetchIssues() {
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
      currentPageIssues[i].comments_data = comments
    }
    issues.push(...currentPageIssues)
  }

  return issues
}
