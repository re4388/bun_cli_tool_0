import { $, question } from 'zx'
import { z } from 'zod'
import { trim } from 'ramda'
import clipboard from 'clipboardy'
import chalk from 'chalk'

export async function getRemoteRepo() {
  const git_path = trim(await question('enter git clone .git path: '))
  // https://github.com/JonnyBurger/npx-visualize-bundle.git

  const validate = z
    .string()
    .startsWith('https://github.com/', { message: 'Must provide git Repo URL' })
    .endsWith('.git')

  validate.parse(git_path)

  console.log(`git clone depth -1 ${git_path}...`)
  const gitClonePath = `/Users/re4388/project/personal/git-clone-pjt`
  await $`cd ${gitClonePath} && git clone --depth 1 ${git_path}`

  const repoName = git_path.split('/').slice(-1)[0].split('.').slice(-2, -1)[0]

  const cd_to_fullPath = 'cd ' + gitClonePath + '/' + repoName
  clipboard.writeSync(`${cd_to_fullPath}`)
  console.log(`${chalk.bgWhite.bold(cd_to_fullPath)} is copied to clipboard!`)
}
