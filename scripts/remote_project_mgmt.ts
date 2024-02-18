import { $ } from 'zx'
import { getRemoteRepo } from '../util/git_clone_depth1.ts'
import select, { Separator } from '@inquirer/select'
import chalk from 'chalk'
import clipboard from 'clipboardy'
import { escAndQToExit } from '../util/escToExit.ts'
import { errLog } from '../util/errorLog.ts'

// escAndQToExit()

const answer = await select({
  message: 'Select...',
  choices: [
    {
      name: 'list',
      value: 'list',
      description: 'show repositories'
    },
    {
      name: 'clone repo',
      value: 'clone repo',
      description: 'get remote repo'
    },
    {
      name: 'show path',
      value: 'show path',
      description: 'show path for remote repo'
    },
    {
      name: 'show size',
      value: 'show size',
      description: 'show size for remote repo'
    }
  ]
})

const gitClonePath = '/Users/re4388/project/personal/git-clone-pjt'

switch (answer) {
  case 'show path': {
    console.log('path: ', gitClonePath)
    break
  }
  case 'list': {
    try {
      await copyProjectToPath()
    } catch (error) {
      errLog(error)
      throw error
    }
    break
  }
  case 'clone repo': {
    try {
      await getRemoteRepo()
    } catch (error) {
      errLog(error)
      throw error
    }

    break
  }
  case 'show size': {
    // await $`cd ${gitClonePath} && gdu-go`
    await $`sh /Users/re4388/project/personal/my-github-pjt/dotfiles/zsh/check_git_clone_pjt.sh`

    const txt = 'or..you can go to directory and goes into interactive mode with "du"'
    console.log(chalk.green(txt))
    const cd_to_fullPath = 'cd ' + gitClonePath
    clipboard.writeSync(cd_to_fullPath)
    console.log(`${chalk.blue(cd_to_fullPath)} is copied to clipboard!`)
    break
  }

  default: {
    console.log('no this option')
  }
}

async function copyProjectToPath() {
  const res = await $`cd ${gitClonePath} && eza -al | fzf`
  // TODO: 這裡  use arrow down key will error
  const fileNameWithSlashN = res.stdout.split(' ').slice(-1)
  const fileName = fileNameWithSlashN[0].split('\n').slice(-2, -1)
  const fullPath = 'cd ' + gitClonePath + '/' + fileName
  clipboard.writeSync(`${fullPath}`)
  console.log(`${chalk.bgWhite.bold(fullPath)} is copied to clipboard!`)
}
