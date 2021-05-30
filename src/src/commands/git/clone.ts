import {Command, flags} from '@oclif/command'
import { Git } from '../../util/git'

export default class GitClone extends Command {
  static description = 'describe the command here'
  static hidden = true

  static flags = {
      ref: flags.string({ default: 'master' }),
      cwd: flags.string({ }),
      token: flags.string({ description: 'Github personal access token'}),
      username: flags.string({ description: 'Github username'}),
      password: flags.string({ description: 'Github password'}),
  }

  static args = [{name: 'repo'}]

  async run(): Promise<void> {
      const {args, flags} = this.parse(GitClone)

      const git = new Git({
          repo: args.repo,
          ref: flags.ref,
          cwd: flags.cwd,
          auth: {
              token: flags.token,
          },
      })
      await git.clone()
  }
}
