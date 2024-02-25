import moment from 'moment-timezone'
import select from '@inquirer/select'
import { $ } from 'zx'
import { escAndQToExit } from '../util/escToExit.ts'
import fs from 'fs'

const quokkaTSPath = '/Users/re4388/Documents/wemo_doc/quokkaTS.ts'
const quokkaJSPath = '/Users/re4388/Documents/wemo_doc/quokkaJS.js'

escAndQToExit()

const editor = await select({
  message: 'Select Editor',
  choices: [
    {
      name: 'Quokka_TS',
      value: 'Quokka_TS'
    },
    {
      name: 'Quokka_JS',
      value: 'Quokka_JS'
    }
  ]
})

switch (editor) {
  case 'Quokka_TS': {
    const line = getBottomLineOfFile(quokkaTSPath)
    await $`code -g ${quokkaTSPath}:${line + 3}`
    break
  }
  case 'Quokka_JS': {
    const line = getBottomLineOfFile(quokkaJSPath)
    await $`code -g ${quokkaJSPath}:${line + 3}`
    break
  }
  default: {
    console.log('no this option')
  }
}

function getBottomLineOfFile(path: string) {
  return fs.readFileSync(path, 'utf8').split('\n').length
}
