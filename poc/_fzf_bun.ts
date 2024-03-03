import { fzf } from 'fzf-bun'
import { $ } from 'zx'

const baseFileFolder = `/Users/re4388/project/personal/lang/bun/bun_cli_0/poc/deprecated_endpoint`

const selections = [
  'post /v11/users/me/quests/:id(d+)/collectRewards',
  'patch /v2/users/:id(d+)',
  'post /v11/pointProducts/:id/exchange',
  'get /v2/batteries/locations'
]


// Run `man fzf` in your shell to see all available fzf options
// const fzfOptions = [
//   '--reverse',
//   '--multi',
//   '--preview-window=right',
//   '--preview',
//   `cat {}`
// ]
//
const fzfOptions = ['--reverse', '--multi']

const selection = await fzf(selections, fzfOptions)
console.log('selection', selection)
const hashed = hashString(selection[0])
const pathToCheck = baseFileFolder + '/' + hashed
await $`cat ${pathToCheck}`.quiet()

// for (const selection of selections) {
//   let fileName = hashString(selection).toString()
//   await Bun.write(baseFileFolder + '/' + fileName, '')
// }

// create a file in a given directory using Bun

// create a hash given a string
function hashString(str: string) {
  return str.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
}

// Do something with selection
// console.log(selection)
