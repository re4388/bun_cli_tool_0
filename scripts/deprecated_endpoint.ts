import { fzf } from 'fzf-bun'
import { $ } from 'zx'
$.verbose = false
import {
  deprecatedEndpointBasePath,
  hashString
} from '../standalone/deprecated_endpoint/utils.ts'
const fs = require('fs').promises

//////////////////////////////////////////////////
const hashPath = `${deprecatedEndpointBasePath}/hash`
const selections = await getEndpointListFromJSON()
await runFzf(selections)

function apple(apple: string) {
  return apple
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
async function runFzf(selections: string[]) {
  const fzfOptions = ['--reverse', '--multi']
  const selection = await fzf(selections, fzfOptions)
  console.log(selection[0])
  const pathToCheck = hashPath + '/' + hashString(selection[0])
  // console.log('------->pathToCheck: ', pathToCheck)
  console.log('')
  await $`awk -F, '{ for (i=1; i<=NF; i++) printf "%-8s", $i; print "" }' ${pathToCheck} | less -S`.pipe(
    process.stdout
  )
}

async function getEndpointListFromJSON() {
  try {
    const res = await fs.readFile(
      `${deprecatedEndpointBasePath}/endpointList.json`,
      'utf8'
    )
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
}
