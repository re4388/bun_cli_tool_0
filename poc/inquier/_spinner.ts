import ora from 'ora'
import pe from '../../util/errorLog.ts'

// Simulating a long-running function
async function getResource() {
  // Simulate some work
  for (let i = 0; i < 5; i++) {
    await fetch('https://medv.io')
  }
}

const spinner = ora()

// why wait 0.1 sec here?

try {
  spinner.start()
  spinner.text = `initializing...`
  // 可能不需要下面這個 0.1 sec 的等待
  // await new Promise((resolve) => setTimeout(resolve, 100))
  await getResource() // 這個 socket 底層會自動開 thread 去跑， file access 也會，但如果是 cpu job, 也會卡 spinner, 就會需要開 thread

  spinner.text = `stag2...`
  // await new Promise((resolve) => setTimeout(resolve, 100))
  await getResource()

  spinner.text = `stag3...`
  // await new Promise((resolve) => setTimeout(resolve, 100))
  await getResource()

  // throw new Error()

  spinner.succeed()
} catch (error) {
  console.log(pe.render(error))
  spinner.fail()
  process.exit(1)
}

// Function to wrap with spinner
async function withSpinner(fn: Function, message: string) {
  const spinner = ora(message).start()
  try {
    await fn()
    spinner.succeed() // Change the spinner to a checkmark
  } catch (error) {
    spinner.fail() // Change the spinner to an X if there's an error
    console.error(error)
  }
}
