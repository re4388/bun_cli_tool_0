import { question } from 'zx'
import { $ } from 'bun'
import { errLog } from '../util/errorLog.ts'
import chalk from 'chalk'
import { appendFile } from 'node:fs/promises'
import * as R from 'ramda'
import figlet from 'figlet'
import select from '@inquirer/select'
import fs from 'fs'
import exitHook from 'exit-hook'
import restoreCursor from 'restore-cursor'
import trash from 'trash'
import { z } from 'zod'
import { edit } from 'external-editor'
import { isFileExist } from '../util/isFileExist.ts'

exitHook(() => {
  restoreCursor()
})

////////////////// const need to at top /////////////////

const removeLenSchema = z
  .string({
    required_error: 'no must be a number within the no. range'
  })
  .trim()
  .transform(covertAndCheck)

const FILE_PATH = '/Users/re4388/project/personal/lang/bun/bun_cli_0/data/todoFile.txt'

////////////////// const need to at top /////////////////

function debugUse() {
  let { len, char } = getLines()
  console.log('------->char: ', char)
  console.log('------->len: ', len)
}

/////////////////main////////////////////////////////////////////////////////////////////
main()
  .then((res) => console.log(res))
  .catch((err) => console.error((err: any) => errLog(err)))

async function main() {
  showTitle()

  let running = true

  while (running) {
    await showReminder()

    restoreCursor()
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
      case 'update': {
        await update()
        break
      }
      case 'remove all': {
        await removeAll()
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

/////////////////main////////////////////////////////////////////////////////////////////
async function removeAll() {
  const yesOrNo = await question('Are You Sure?(y/n) tip: files goes into trash can')
  if (yesOrNo === 'y') {
    await trash([FILE_PATH])
  } else {
    console.log('')
    console.log('***no operation***')
    console.log('')
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
        name: 'update',
        value: 'update',
        description: 'update an item'
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

async function update() {
  const line = await question('the no. you want to update? ')
  try {
    removeLenSchema.parse(line)
    const text = getItemByLine(line)

    // open default editor to edit the current line
    const updatedText = edit(`${text}`)
    updateText({ line, updatedText })
  } catch (err) {
    errLog(err)
  }
}

function updateText(param: { line: string; updatedText: string }) {
  const { line, updatedText } = param
  try {
    // Read the content of the file synchronously
    const data = fs.readFileSync(FILE_PATH, 'utf8')

    // Split the content into an array of lines
    const lines = data.split('\n')
    lines[Number(line) - 1] = updatedText.trim()
    // Join the remaining lines back into a string
    // const updatedContent = lines.slice(0, -1).join('\n')
    const updatedContent = lines.join('\n')

    // Write the updated content back to the file synchronously
    fs.writeFileSync(FILE_PATH, updatedContent, 'utf8')
  } catch (err) {
    errLog(err)
  }
}

async function remove() {
  try {
    const input = await question('the no. you want to delete? ')
    removeLenSchema.parse(input)
    const yesOrNo = await question('Are You Sure?(y/n)')
    if (yesOrNo === 'y') removeLineFromFile(input)
  } catch (err) {
    errLog(err)
  }
}

function showTitle() {
  console.log(
    figlet.textSync('Reminder', {
      font: 'Larry 3D',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
  )
  console.log(chalk.blue('keep note in lighting speed!'))
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

function getItemByLine(line: string) {
  try {
    // Read the content of the file synchronously
    const data = fs.readFileSync(FILE_PATH, 'utf8')

    // Split the content into an array of lines
    const lines = data.split('\n')
    return lines[Number(line) - 1]
  } catch (err) {
    errLog(err)
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
    errLog(err)
  }
}

async function readFile() {
  // handle file is not exist, after trash it
  if (!isFileExist(FILE_PATH)) {
    await $`touch ${FILE_PATH}`.quiet() // No output
  }

  return await Bun.file(FILE_PATH).text()
}

function printOutTodos(res: string) {
  console.log('current list: ==================================================')
  let numOfTodo = 1
  res.split('\n').forEach((line) => {
    console.log(`${numOfTodo++}. ${line}`)
  })
  console.log('================================================================')
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
