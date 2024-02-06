import * as R from 'ramda'

const TAGS = {
  vscode_ext: {
    displayText: 'Vscode extension',
    keywords: 'vscode/extensions'
  },
  fnm: {
    displayText: 'fnm shells',
    keywords: 'fnm_multishells'
  },
  vscode: {
    displayText: 'VSCode',
    keywords: 'Visual Studio Code.app'
  }
}

const tags = Object.values(TAGS).map((v) => v.keywords)
console.log('------->tags: ', tags)
