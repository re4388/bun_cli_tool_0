import Redis from 'ioredis'

const redis = new Redis('6379')
redis.flushall()

// 存储电话使用次数
async function storePhoneUsage(sentryToken: string, phoneId: string): Promise<void> {
  // 使用 Hash 数据类型存储电话使用次数
  const phoneKey = `sentryToken:${sentryToken}:phone:${phoneId}`
  await redis.hincrby(phoneKey, 'usageCount', 1)

  // 将电话 ID 添加到 sentryToken 的电话集合中
  const sentryPhonesKey = `sentryToken:${sentryToken}:phones`
  await redis.sadd(sentryPhonesKey, phoneId)
}

// 检索 sentryToken 的所有电话使用次数
async function getSentryPhonesUsage(
  sentryToken: string
): Promise<Record<string, number>> {
  const sentryPhonesKey = `sentryToken:${sentryToken}:phones`
  const phoneIds = await redis.smembers(sentryPhonesKey)

  const phonesUsage: Record<string, number> = {}
  for (const phoneId of phoneIds) {
    const phoneKey = `sentryToken:${sentryToken}:phone:${phoneId}`
    const usageCount = await redis.hget(phoneKey, 'usageCount')
    phonesUsage[phoneId] = parseInt(usageCount || '0', 10)
  }

  return phonesUsage
}

// 检索某一个电话的使用次数
async function getPhoneUsage(sentryToken: string, phoneId: string): Promise<number> {
  const phoneKey = `sentryToken:${sentryToken}:phone:${phoneId}`
  const usageCount = await redis.hget(phoneKey, 'usageCount')
  return parseInt(usageCount || '0', 10)
}

// Example usage
;(async () => {
  const sentryToken = 'sentry123'
  const phoneId = '0934441'
  // 存储电话使用次数
  await storePhoneUsage(sentryToken, phoneId)
  await storePhoneUsage(sentryToken, '0934442')
  await storePhoneUsage(sentryToken, '0934443')
  await storePhoneUsage(sentryToken, '0934443')

  // 检索 sentryToken 的所有电话使用次数
  const sentryPhonesUsage = await getSentryPhonesUsage(sentryToken)
  console.log(`Phone usage for sentryToken ${sentryToken}:`, sentryPhonesUsage)

  // 检索某一个电话的使用次数
  const phoneUsage = await getPhoneUsage(sentryToken, phoneId)
  console.log(`Phone ${phoneId} usage for sentryToken ${sentryToken}:`, phoneUsage)

  redis.disconnect()
})()
