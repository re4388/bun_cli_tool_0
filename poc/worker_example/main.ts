import ora from 'ora'

const spinner = ora()
const workerURL = new URL('./worker.ts', import.meta.url).href
const worker = new Worker(workerURL)

// listen for worker open event
worker.addEventListener('open', () => {
  // console.log('worker is ready')
})

// listen for worker message event
worker.addEventListener('message', (event) => {
  // console.log('main: receive: ', event.data)

  // To stop a running worker from keeping the process alive, call worker.unref(). This decouples the lifetime of the worker to the lifetime of the main process
  if (event.data === 'begin') {
    spinner.text = 'start...'
  }

  if (event.data === 'half_done') {
    spinner.text = 'half done...'
  }

  if (event.data === 'done') {
    spinner.text = 'done'
    spinner.succeed()
    worker.unref()
  }
})

worker.addEventListener('close', (event) => {
  console.log('worker is being closed')
})

spinner.start()
worker.postMessage('main: worker started')
