import { fzf } from 'fzf-bun'

const selections = [
  'post /v11/users/me/quests/:id(d+)/collectRewards',
  'patch /v2/users/:id(d+)',
  'post /v11/pointProducts/:id/exchange',
  'get /v2/batteries/locations'
]

// Run `man fzf` in your shell to see all available fzf options
const fzfOptions = [
  '--reverse',
  '--multi',
  '--preview-window=right',
  '--preview',
  `cat {}`
]
const selection = await fzf(selections, fzfOptions)
console.log('------->selection: ', selection)
