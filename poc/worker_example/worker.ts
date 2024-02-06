const crypto = require('crypto')

// prevents TS errors
declare var self: Worker

// To receive messages in the worker thread
self.addEventListener('message', (event) => {
  // console.log(event.data)

  postMessage('begin')
  for (let i = 0; i < 500000; i++) {
    encryptData('hello world')
  }
  postMessage('half_done')
  for (let i = 0; i < 500000; i++) {
    encryptData('hello world')
  }

  // On the worker thread, `postMessage` is automatically "routed" to the parent thread.
  postMessage('done')
})

function encryptData(data: string) {
  // Simulate a time-consuming encryption process
  const start = Date.now()
  const key = crypto.randomBytes(32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  let encrypted = cipher.update(data, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  const end = Date.now()

  return encrypted
}
