import { fzf } from 'fzf-bun'

// Run `man fzf` in your shell to see all available fzf options
const fzfOptions = ['--multi', '--preview-window=up', '--preview', 'echo {}']

const selections = ['Pen ✒️', 'Pineapple 🍍', 'Apple 🍎', 'Pen ✒️']

const selection = await fzf(selections, fzfOptions)

// Do something with selection
console.log(selection)
