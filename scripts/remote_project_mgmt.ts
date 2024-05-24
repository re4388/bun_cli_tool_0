import { $ } from 'zx'
import { getRemoteRepo } from '../util/git_clone_depth1.ts'
import select, { Separator } from '@inquirer/select'
import chalk from 'chalk'
import clipboard from 'clipboardy'
import { escAndQToExit } from '../util/escToExit.ts'
import { errLog } from '../util/errorLog.ts'

enum OPTION {
  clone_repo = 'clone repo',
  list = 'list',
  show_path = 'show path',
  show_size = 'show size'
}

const answer = await select({
  message: 'Select...',
  choices: [
    {
      name: OPTION.clone_repo,
      value: OPTION.clone_repo,
      description: 'get remote repo'
    },
    {
      name: OPTION.list,
      value: OPTION.list,
      description: 'show repositories'
    },
    {
      name: OPTION.show_path,
      value: OPTION.show_path,
      description: 'show path for remote repo'
    },
    {
      name: OPTION.show_size,
      value: OPTION.show_size,
      description: 'show size for remote repo'
    }
  ]
})

const Git_Clone_Path = '/Users/re4388/project/personal/git-clone-pjt'

switch (answer) {
  case OPTION.show_path: {
    console.log('path: ', Git_Clone_Path)
    break
  }
  case OPTION.list: {
    try {
      await copyPathToClipboard()
    } catch (error) {
      errLog(error)
      throw error
    }
    break
  }
  case OPTION.clone_repo: {
    try {
      await getRemoteRepo()
    } catch (error) {
      errLog(error)
      throw error
    }

    break
  }
  case OPTION.show_size: {
    // await $`cd ${gitClonePath} && gdu-go`
    await $`sh /Users/re4388/project/personal/my-github-pjt/dotfiles/zsh/check_git_clone_pjt.sh`

    const txt = 'or..you can go to directory and goes into interactive mode with "du"'
    console.log(chalk.green(txt))
    const cd_to_fullPath = 'cd ' + Git_Clone_Path
    clipboard.writeSync(cd_to_fullPath)
    console.log(`${chalk.blue(cd_to_fullPath)} is copied to clipboard!`)
    break
  }

  default: {
    console.log('no this option')
  }
}

async function copyPathToClipboard() {
  const res = await $`cd ${Git_Clone_Path} && eza -al | fzf`
  // TODO: 這裡  use arrow down key will error
  const fileNameWithSlash = res.stdout.split(' ').slice(-1)
  const fileName = fileNameWithSlash[0].split('\n').slice(-2, -1)
  const fullPath = 'cd ' + Git_Clone_Path + '/' + fileName
  clipboard.writeSync(`${fullPath}`)
  console.log(`${chalk.bgWhite.bold(fullPath)} is copied to clipboard!`)
}
