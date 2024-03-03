import { fzf } from 'fzf-bun'
import { $ } from 'zx'
$.verbose = false

const fs = require('fs').promises

const basePath = `/Users/re4388/project/personal/lang/bun/bun_cli_0/scripts/deprecated_endpoint`
const hashPath = `${basePath}/hash`

const selections = await getEndpointListFromJSON()

await runFzf(selections)

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
async function runFzf(selections: string[]) {
  const fzfOptions = ['--reverse', '--multi']
  const selection = await fzf(selections, fzfOptions)
  const pathToCheck = hashPath + '/' + hashString(selection[0])
  console.log('')
  console.log('')
  await $`awk -F, '{ for (i=1; i<=NF; i++) printf "%-8s", $i; print "" }' ${pathToCheck} | less -S`.pipe(
    process.stdout
  )
}

function hashString(str: string) {
  return str.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
}

async function getEndpointListFromJSON() {
  try {
    const res = await fs.readFile(`${basePath}/endpointList.json`, 'utf8')
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
  }
}
