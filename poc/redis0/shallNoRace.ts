import Redis from 'ioredis'

const redis = new Redis('6379') // 初始化 Redis 客戶端
redis.flushall()

// await limitApiCall('0934442')
// await limitApiCall('0934442')
// await limitApiCall('0934442')
// await limitApiCall('0934442')

await Promise.all([
  limitApiCall('0934441'),
  limitApiCall('0934441'),
  limitApiCall('0934441'),
  limitApiCall('0934441')
  // rateLimit2V4('0934441')
])

async function limitApiCall(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const current = await redis.llen(key)
  console.log('current -->', current)

  if (current >= 3) {
    redis.set(key, 180 * 60) // 10 min
    throw new Error('too many requests per second')
  } else {
    // check exit
    const exists = await redis.exists(phone)

    // if not exists, add to list
    if (!exists) {
      const multi = redis.multi()
      multi.rpush(key, phone)
      multi.expire(key, 10 * 60) // 10 min
      await multi.exec()
    } else {
      await redis.rpushx(key, phone)
    }
  }
}
