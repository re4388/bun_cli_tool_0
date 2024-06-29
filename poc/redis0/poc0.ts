import Redis from 'ioredis'
// import { getRepository } from 'typeorm'
// import { BlockRecord } from './entities/BlockRecord' // 假設BlockRecord是你的TypeORM實體

const redis = new Redis('6379') // 初始化 Redis 客戶端
redis.flushall()

await rateLimit('', '0934441', 'sentry123')
await rateLimit('0934441', '0934442', 'sentry123')
await rateLimit('0934442', '0934441', 'sentry123')
await rateLimit('0934441', '0934442', 'sentry123')

async function rateLimit(
  previousPhone: string,
  currentPhone: string,
  sentryToken: string
): Promise<void> {
  const key = `Register:PhoneChanged4TimesInSentryToken:${sentryToken}`
  const ttl = (30 + 5) * 60 // 30分鐘 + 5 分鐘 buffer

  const value = await redis.get(key)

  if (value === null) {
    // Key 不存在，設置初始值和 TTL
    await redis.set(key, '1', 'EX', ttl)
  } else {
    const intValue = parseInt(value, 10)

    if (intValue < 3 && previousPhone !== currentPhone) {
      // 增加值
      const incrRes = await redis.incr(key)
      console.log('incrRes -->', incrRes)
    } else if (intValue >= 3) {
      console.log('intValue -->', intValue)

      // 添加到數據庫的封鎖列表
      // const blockRecordRepository = getRepository(BlockRecord)
      // const blockRecord = new BlockRecord()
      // blockRecord.blockTarget = currentPhone
      // blockRecord.flow = 1 // 根據實際情況設置
      // blockRecord.condition = 1 // 根據實際情況設置
      // blockRecord.beginAt = new Date()
      // blockRecord.endAt = new Date() + 180 min // 這裡設置為當前時間

      // await blockRecordRepository.save(blockRecord)

      // 拋出錯誤
      throw new Error('Rate limit exceeded, blocking action performed')
    }
  }
}

export default rateLimit
