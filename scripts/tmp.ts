import moment from 'moment-timezone'
import select from '@inquirer/select'
import { $ } from 'zx'
import { escAndQToExit } from '../util/escToExit.ts'

escAndQToExit()

// 建立路徑
const fileName = moment.utc(Date.now()).tz('Asia/Taipei').format().replaceAll(/[-:T]/g, '_').split('+')[0]
const filePath = `/Users/re4388/tmp/tmp_${fileName}`

// /Users/re4388/tmp/tmp_2024_02_04_18_09_16

const editor = await select({
  message: 'Select Editor',
  choices: [
    {
      name: 'VsCode',
      value: 'VsCode'
    },
    {
      name: 'Notion',
      value: 'Notion'
    },
    {
      name: 'Notes(Apple)',
      value: 'Notes(Apple)'
    },
    {
      name: 'intelliJ IDEA',
      value: 'intelliJ IDEA',
      disabled: true,
      description: 'not implemented'
    }
  ]
})

switch (editor) {
  case 'VsCode':
    {
      const fileType = await select({
        message: 'filetype',
        choices: [
          {
            name: '.js',
            value: '.js'
          },
          {
            name: '.ts',
            value: '.ts'
          },
          {
            name: '.json',
            value: '.json'
          },
          {
            name: '.md',
            value: '.md'
          }
        ]
      })

      switch (fileType) {
        case '.json':
          await $`code ${filePath}${fileType}.json`
          break
        case '.md':
          await $`code ${filePath}${fileType}.md`
          break
        case '.ts':
          await $`code && sleep 2 && node /Users/re4388/project/personal/nodejs/robotJS/quokkaTS.js`
          break
        case '.js':
          await $`code && sleep 2 && node /Users/re4388/project/personal/nodejs/robotJS/quokkaJS.js`
          break
        default:
          console.log('not implemented')
      }

      // await $`code ${filePath}${fileType}`
      // await $`code && sleep  && node /Users/re4388/project/personal/nodejs/robotJS/quokkaJS.js`
      // break
    }
    break
  case 'intelliJ IDEA': {
    console.log('not implemented')
    // await $`idea ${filePath}`
    break
  }
  case 'Notion': {
    await $`open -a "Notion" && sleep 1 && node /Users/re4388/project/personal/nodejs/robotJS/cmd_n.js`
    break
  }
  case 'Notes(Apple)': {
    await $`open -a "Notes" && sleep 1 && node /Users/re4388/project/personal/nodejs/robotJS/cmd_n.js`
    break
  }
  default: {
    console.log('no this option')
  }
}
