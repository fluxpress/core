import { Octokit } from 'octokit'

import { GITHUB_REST_API_VERSION } from '../constants/app.js'
import { readFluxPressConfig, readGitHubToken } from '../utils/config.js'
import { Users } from './users-types.js'
import packageJson from '../../package.json' assert { type: 'json' }

export async function fetchUsers(): Promise<Users> {
  const fluxpressConfig = await readFluxPressConfig()
  if (!fluxpressConfig) return

  const GITHUB_TOKEN = readGitHubToken()
  const octokit = new Octokit({ auth: GITHUB_TOKEN })

  const data_users: Users = {
    version: packageJson.version,
    metadata: {
      fetch_time: new Date().toLocaleString(),
      github: {
        owner: fluxpressConfig.github.owner,
        repo: fluxpressConfig.github.repo,
      },
    },
    user: await getUser(octokit),
    social_accounts: await getSocialAccounts(octokit),
    followers: await getFollowers(octokit),
  }

  return data_users
}

async function getUser(octokit: Octokit) {
  const { data: user } = await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
    },
  })
  return user
}

async function getSocialAccounts(octokit: Octokit) {
  const { data: social_accounts } = await octokit.request(
    'GET /user/social_accounts',
    {
      headers: {
        'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
      },
    },
  )
  return social_accounts
}

async function getFollowers(octokit: Octokit) {
  const { data: followers } = await octokit.request('GET /user/followers', {
    headers: {
      'X-GitHub-Api-Version': GITHUB_REST_API_VERSION,
    },
  })
  return followers
}
