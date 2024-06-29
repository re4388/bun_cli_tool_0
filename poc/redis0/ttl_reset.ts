// import Redis from 'ioredis'

// const redis = new Redis('6379') // 初始化 Redis 客戶端
// redis.flushdb()

// const key = '11111'

// await redis.set(key, 1, 'EX', 330)
// await redis.incr(key)
// // await redis.set(key, 2)
// // await redis.set(key, 1, 'EX', TTLinSec)

// const Redis = require('ioredis')
import Redis from 'ioredis'

const redis = new Redis('6379') // 初始化 Redis 客戶端
redis.flushdb()

const key = '4444444444444'
async function a1() {
  const data = {
    isBlocked: false,
    counter: 1
  }
  await redis.set(key, JSON.stringify(data), 'EX', 10)
  const data2 = {
    isBlocked: false,
    counter: 2
  }
  await redis.set(key, JSON.stringify(data2))
}

a1().then(() => {
  console.log('done')
})
