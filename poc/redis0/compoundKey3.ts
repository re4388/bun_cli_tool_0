import Redis from 'ioredis'

const redis = new Redis('6379')
redis.flushall()

const TIME_FRAME = 10 * 60 // 10 minutes in seconds

// 存储电话使用次数
async function storePhoneUsage(sentryToken: string, phoneId: string): Promise<void> {
  const phoneKey = `sentryToken:${sentryToken}:phone:${phoneId}`
  const sentryPhonesKey = `sentryToken:${sentryToken}:phones`
  const currentTime = Math.floor(Date.now() / 1000)

  // 檢查同一個 sentryToken 是否有超過 3 個以上的 phoneId
  const phoneCount = await redis.scard(sentryPhonesKey)
  if (phoneCount >= 3 && !(await redis.sismember(sentryPhonesKey, phoneId))) {
    throw new Error(`sentryToken ${sentryToken} has more than 3 phoneIds`)
  }

  // 使用 Sorted Set 存储每次使用的时间戳
  const uniqueMember = `${currentTime}:${Math.random()}`
  await redis.zadd(phoneKey, currentTime, uniqueMember)

  // 移除超過 10 分鐘的時間戳
  await redis.zremrangebyscore(phoneKey, 0, currentTime - TIME_FRAME)

  // 檢查同一個 sentryToken 下的每一個 phoneId 是否在 10 分鐘內有使用超過 3 次
  console.log('phoneKey -->', phoneKey)
  const usageCount = await redis.zcount(phoneKey, currentTime - TIME_FRAME, currentTime)
  console.log('usageCount -->', usageCount)
  if (usageCount > 3) {
    throw new Error(
      `phoneId ${phoneId} under sentryToken ${sentryToken} has been used more than 3 times in the last 10 minutes`
    )
  }

  // 将电话 ID 添加到 sentryToken 的电话集合中
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
    console.log('phoneKey -->', phoneKey)
    const currentTime = Math.floor(Date.now() / 1000)
    const usageCount = await redis.zcount(phoneKey, currentTime - TIME_FRAME, currentTime)
    phonesUsage[phoneId] = usageCount
  }

  return phonesUsage
}

// 检索某一个电话的使用次数
async function getPhoneUsage(sentryToken: string, phoneId: string): Promise<number> {
  const phoneKey = `sentryToken:${sentryToken}:phone:${phoneId}`
  const currentTime = Math.floor(Date.now() / 1000)
  const usageCount = await redis.zcount(phoneKey, currentTime - TIME_FRAME, currentTime)
  return usageCount
}

// Example usage
;(async () => {
  const sentryToken = 'sentry123'

  try {
    // 存储电话使用次数
    await storePhoneUsage(sentryToken, '0934441')
    await storePhoneUsage(sentryToken, '0934442')
    await storePhoneUsage(sentryToken, '0934443')
    await storePhoneUsage(sentryToken, '0934443')
    await storePhoneUsage(sentryToken, '0934443') // This should be fine
    await storePhoneUsage(sentryToken, '0934443') // This should err since it's been used more than 3 times in the last 10 minutes
    // await storePhoneUsage(sentryToken, '0934444') // This should throw an error for 同一個 sentryToken 是否有超過 3 個以上的 phoneId

    // 检索 sentryToken 的所有电话使用次数
    const sentryPhonesUsage = await getSentryPhonesUsage(sentryToken)
    console.log(`Phone usage for sentryToken ${sentryToken}:`, sentryPhonesUsage)

    // 检索某一个电话的使用次数
    const phoneId = '0934443'
    const phoneUsage = await getPhoneUsage(sentryToken, phoneId)
    console.log(`Phone ${phoneId} usage for sentryToken ${sentryToken}:`, phoneUsage)
  } catch (error) {
    console.error(error)
  } finally {
    redis.disconnect()
  }
})()
