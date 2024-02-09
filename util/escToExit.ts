const readline = require('readline')
import chalk from 'chalk'

/**
 * 使用須知
 * 1. 使用時，不要使用 await, 會 block
 * 2. if the program need to input stuff, no use it. Since you can input `q` and leave, bad UX.
 *
 */
export async function escAndQToExit() {
  readline.emitKeypressEvents(process.stdin)
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true)
  }

  process.stdin.on('keypress', (str, key) => {
    if (!key) {
      return
    }

    if (key.name === 'escape' || (key.ctrl && key.name === 'c') || key.name === 'q') {
      console.log(chalk.blue('\nbye bye'))
      process.exit()
    }
  })
}
