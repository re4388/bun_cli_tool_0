import find from 'find-process'
import { $, question } from 'zx'
import { z } from 'zod'
import chalk from 'chalk'
import * as R from 'ramda'

const portSchema = z
  .string({
    required_error: 'port must be a number within the range [0, 65535]'
  })
  .trim()
  .transform(covertAndCheck)

// TODO: need to change, here it does not validate
function covertAndCheck(port: string) {
  const portNumber = Number(port)
  if (Number.isNaN(portNumber)) {
    return false
  }

  if (portNumber > 65535 || portNumber < 0) {
    return false
  }
}

const port = await question('port? ')
portSchema.parse(port)

find('port', port).then(
  async (res: any) => {
    if (R.isEmpty(res)) {
      console.log('port is not being used')
      await Bun.write(Bun.stdout, 'port is not being used')
    } else {
      console.log(chalk.blue(res))

      const ans = await question('kill? (y/n)')
      switch (ans) {
        case 'y': {
          await $`kill -9 ${res[0].pid}`
          break
        }
        case 'n': {
          console.log('bye bye ~')
          break
        }
        default: {
          console.log('not y or n')
          break
        }
      }
    }
  },
  (err: { stack: any }) => {
    console.log(err.stack || err)
  }
)
