import { question } from 'zx'
import { $ } from 'bun'
import pe from '../util/prettyError.ts'
import chalk from 'chalk'
import { escAndQToExit } from '../util/escToExit.ts'
import readline from 'readline'
import { appendFile } from 'node:fs/promises'
import * as R from 'ramda'
import figlet from 'figlet'
import select from '@inquirer/select'
import fs from 'fs'
import exitHook from 'exit-hook'
import restoreCursor from 'restore-cursor'
import trash from 'trash'
import { z } from 'zod'

exitHook(() => {
  restoreCursor()
})

const FILE_PATH = '/Users/re4388/project/personal/lang/bun/bun_cli_0/data/todoFile.txt'

let { len, char } = getLines()
// console.log('------->char: ', char)
// console.log('------->len: ', len)

////////////////////////////////////////////////////////////////////////////////////////////
main()
  .then((res) => console.log(res))
  .catch((err) => console.error(pe.render(err)))

////////////////////////////////////////////////////////////////////////////////////////////
async function main() {
  showTitle()
  // escAndQToExit()

  let running = true

  while (running) {
    await showReminder()

    const action = await chooseAction()
    switch (action) {
      case 'add': {
        await add()
        break
      }
      case 'remove': {
        await remove()
        break
      }
      case 'remove all': {
        await trash([FILE_PATH])
        break
      }

      case 'quit': {
        running = false
        console.log('bye bye')
        break
      }
      default: {
        console.log('no this option')
      }
    }
  }
}

async function chooseAction(): Promise<string> {
  console.log('')
  console.log('')
  const action = await select({
    message: 'Select...',
    choices: [
      {
        name: 'add',
        value: 'add',
        description: 'add a reminder'
      },
      {
        name: 'remove',
        value: 'remove',
        description: 'remove a reminder'
      },
      {
        name: 'remove all',
        value: 'remove all',
        description: 'remove all reminder'
      },
      {
        name: 'quit',
        value: 'quit',
        description: 'quit the program'
      }
    ]
  })

  return action
}

async function showReminder() {
  const res = await readFile()
  if (R.isEmpty(res)) {
    return
  }
  printOutTodos(res)
}

async function add() {
  const input = await question('write down your note: ')
  let { len, char } = getLines()
  if (len === 1 && char === 0) {
    await appendFile(FILE_PATH, `${input}`)
  } else {
    await appendFile(FILE_PATH, `\n${input}`)
  }
}

async function remove() {
  const input = await question('the no. you want to delete? ')
  const removeLenSchema = z
    .string({
      required_error: 'no must be a number within the no. range'
    })
    .trim()
    .transform(covertAndCheck)

  try {
    removeLenSchema.parse(input)
    removeLineFromFile(input)
  } catch (error) {
    console.log('------->error: ', error)
    console.log(chalk.red('請輸入有效的 no.'))
  }
}

function showTitle() {
  console.log(
    figlet.textSync('Reminder', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  )
  console.log(chalk.red('esc or q to quit'))
  console.log('')
}

function getLines() {
  const data = fs.readFileSync(FILE_PATH, 'utf8')
  const len = data.split('\n').length
  const char = data.split('').length
  return {
    len,
    char
  }
}

function removeLineFromFile(lineToRemove: string) {
  try {
    // Read the content of the file synchronously
    const data = fs.readFileSync(FILE_PATH, 'utf8')

    // Split the content into an array of lines
    const lines = data.split('\n')

    // Find and remove the specified line
    const newLines = [...lines.slice(0, Number(lineToRemove) - 1), ...lines.slice(Number(lineToRemove))]

    // Join the remaining lines back into a string
    const updatedContent = newLines.join('\n')

    // Write the updated content back to the file synchronously
    fs.writeFileSync(FILE_PATH, updatedContent, 'utf8')

    // console.log('Line removed successfully.')
  } catch (err) {
    console.error(pe.render(err))
  }
}

async function readFile() {
  // handle file is not exist, after trash it
  try {
    fs.accessSync(FILE_PATH, fs.constants.F_OK)
  } catch (err) {
    await $`touch ${FILE_PATH}`.quiet() // No output
    // fs.writeFileSync(FILE_PATH, '', 'utf8')
  }
  const fileContent = fs.readFileSync(FILE_PATH, 'utf8')
  const todos = Bun.file(FILE_PATH)
  return await todos.text()
}

function printOutTodos(res: string) {
  console.log('current list: ==================================================')
  let numOfTodo = 1
  res.split('\n').forEach((line) => {
    console.log(`${numOfTodo++}. ${line}`)
  })
  console.log('================================================================')
  console.log('')
  console.log('')
  console.log('')
}

function covertAndCheck(NumberToDelete: string) {
  const numToDelete = Number(NumberToDelete)
  if (Number.isNaN(numToDelete)) {
    return false
  }

  const { len } = getLines()

  // no item to delete
  if (len === 0) {
    return false
  }

  if (numToDelete >= 1 || numToDelete <= len) {
    return false
  }
}
