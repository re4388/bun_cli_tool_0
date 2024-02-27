import { fzf } from 'fzf-bun'
import { $ } from 'zx'

const family_url =
  'https://www.figma.com/file/s0YvPzdc1sjB4ADZrS2md1/family?type=whiteboard&node-id=0-1&t=0Ut1GHG1xV9PvKnd-0'
const my_url =
  'https://www.figma.com/file/4MD4T4IegKTKPRN3RdJGE5/my?type=whiteboard&node-id=0-1&t=41G55Em8sNUTWfB5-0'
const work_url =
  'https://www.figma.com/file/K7vENJvYjl1Mw0mULI0YFo/BE-benhu-draft-0?type=whiteboard&node-id=0-1&t=xbwtMRqf3JIBlacJ-0'
const re4388Profile = 12
const WeMoProfile = 3

const selections = ['wemo-work', 'family', 'my']
const fzfOptions = ['--multi', '--preview-window=up', '--preview', 'echo {}']
const selection = await fzf(selections, fzfOptions)

switch (selection[0]) {
  case 'my': {
    $`open -na "Google Chrome" --args --profile-directory="Profile ${re4388Profile}" --new-window ${my_url}`
    break
  }
  case 'family': {
    $`open -na "Google Chrome" --args --profile-directory="Profile ${re4388Profile}" --new-window ${family_url}`
    break
  }
  case 'wemo-work': {
    $`open -na "Google Chrome" --args --profile-directory="Profile ${WeMoProfile}" --new-window ${work_url}`
    break
  }
  default: {
    console.log('no this option')
  }
}
