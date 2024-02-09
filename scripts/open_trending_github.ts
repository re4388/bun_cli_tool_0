import checkbox, { Separator } from '@inquirer/checkbox'
import { $ } from 'bun'
import chalk from 'chalk'
import { escAndQToExit } from '../util/escToExit.ts'
import exitHook from 'exit-hook'
import restoreCursor from 'restore-cursor'

exitHook(() => {
  restoreCursor()
})

escAndQToExit()

const languages = await checkbox({
  message: 'Select a language',
  choices: [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'TypeScript', value: 'typescript' },
    { name: 'Go', value: 'go' },
    { name: 'Python', value: 'Python' },
    { name: 'C', value: 'c' },
    { name: 'Shell', value: 'shell' },
    { name: 'Java', value: 'java' },
    { name: 'All', value: 'All' }
  ]
})

Promise.all([
  languages.map(
    async (lang) =>
      await $`open -na "Google Chrome" --args --profile-directory="Profile 12" --new-window https://github.com/trending/${lang}?since=weekly`
  )
]).then((r) => console.log(chalk.bgWhite('done')))
