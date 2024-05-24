import { $ } from 'zx'

const { prompt } = require('enquirer')
const isUrl = require('is-url')

const response = await prompt({
  type: 'input',
  name: 'url',
  message: 'what url you are to timing',
  validate: (value: string) => {
    if (isUrl(value)) {
      return true
    } else {
      return 'Invalid url format'
    }
  }
})

// console.log(response.url)

await $`/Users/re4388/Library/Caches/fnm_multishells/46884_1707223495071/bin/node /Users/re4388/project/personal/nodets/ts_cli_0/node_modules/ts-node/dist/bin.js /Users/re4388/project/personal/nodets/ts_cli_0/src/timing.mts --url ${response.url}`
