import { Octokit } from '@octokit/rest'
import { GitCredentials } from '../util/config'

export enum RepoVisibility {
    PRIVATE = 'private',
    PUBLIC = 'public',
    INTERNAL = 'internal',
}

export class Github {
    client: any

    constructor(credentials: GitCredentials, baseUrl?: string) {
        this.client = new Octokit({
            auth: credentials.token,
            userAgent: 'harness-cli v0.9.2',
            baseUrl: baseUrl,
        })
    }

    async createRepo(org: string, name: string, description?: string, visibility?: RepoVisibility) {
        await this.client.repos.createInOrg({ 
            org, 
            name,
            description,
            private: visibility === RepoVisibility.PRIVATE,
            visibility: visibility || RepoVisibility.PRIVATE,
            // team_id: undefined,

        })

        this.client.repos.remo
    }

    async listRepos(org: string, type: string) {
        // eslint-disable-next-line no-return-await
        return await this.client.repos.listForOrg({ org: org, type: type })
    }

    async createWebhook(owner: string, repo: string, url: string) {
        await this.client.repos.createWebhook({
            owner,
            repo,
            config: {
                url: url,
                // eslint-disable-next-line camelcase
                content_type: 'json',
            },
        })
    }

    async deleteRepo(owner: string, repo: string) {
        await this.client.repos.delete({
            owner,
            repo,
        })
    }
}
