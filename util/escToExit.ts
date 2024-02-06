/// @ts-ignore
import escExit from 'esc-exit'

const readline = require('readline')

export async function escAndQToExit() {
  return new Promise((resolve, reject) => {
    escExit()
    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
    }
    process.stdin.on('keypress', (str, key) => {
      if (key.name === 'q') {
        console.log('bye bye')
        process.exit()
      }
    })
  })
}
