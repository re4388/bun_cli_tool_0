import PQueue from 'p-queue'
import axios from 'axios'

const queue = new PQueue({ concurrency: 2 })

const f1 = () => axios.get('https://sindresorhus.com')
const f2 = () => axios.get('https://avajs.dev')

;(async () => {
  await queue.add(f1)
  console.log('Done: sindresorhus.com')
})()
;(async () => {
  await queue.add(f2)
  console.log('Done: avajs.dev')
})()
