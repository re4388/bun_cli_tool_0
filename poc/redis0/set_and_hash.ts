// 要設計一個 `checkPhoneNumber` 函數來檢查兩個條件：

// 1. 當相同的 `phoneNumber` 在10分鐘內被輸入超過3次時，拋出錯誤。
// 2. 當在相同的 `sessionToken` 中輸入了4個不同的 `phoneNumber` 時，拋出錯誤。

// 我們將使用 TypeScript 和 Redis 來實現這個功能。Redis 提供了多種數據類型來幫助我們實現這些需求，例如 `SET` 和 `HASH`。

// 以下是具體的實現步驟：

// 1. 使用 Redis 的 `SET` 來追踪每個 `phoneNumber` 的輸入次數和時間。
// 2. 使用 Redis 的 `HASH` 來追踪每個 `sessionToken` 中的不同 `phoneNumber`。

// 以下是具體的 TypeScript 代碼：
import Redis from 'ioredis'
import { createClient } from 'redis'

// const redisClient = createClient();

const client = new Redis('6379')
client.flushall()

client.on('error', (err) => console.error('Redis Client Error', err))

await client.connect()

async function checkPhoneNumber(
  phoneNumber: string,
  sessionToken: string
): Promise<void> {
  const phoneNumberKey = `phoneNumber:${phoneNumber}`
  const sessionTokenKey = `sessionToken:${sessionToken}`

  // 檢查 phoneNumber 的輸入次數
  const phoneNumberCount = await client.zcount(phoneNumberKey, '-inf', '+inf')
  if (phoneNumberCount >= 3) {
    throw new Error(
      'The same phoneNumber has been entered more than 3 times in 10 minutes.'
    )
  }

  // 增加 phoneNumber 的輸入次數並設置過期時間
  const currentTime = Date.now()
  await client.zadd(
    phoneNumberKey,
    JSON.stringify({ score: currentTime, value: currentTime.toString() })
  )
  await client.expire(phoneNumberKey, 60 * 10) // 10分鐘過期

  // 檢查 sessionToken 中的不同 phoneNumber 數量
  const sessionPhoneNumbers = await client.hkeys(sessionTokenKey)
  if (sessionPhoneNumbers.length >= 4 && !sessionPhoneNumbers.includes(phoneNumber)) {
    throw new Error(
      'More than 4 different phoneNumbers have been entered in the same sessionToken.'
    )
  }

  // 增加 sessionToken 中的 phoneNumber
  await client.hset(sessionTokenKey, phoneNumber, '1')
  await client.expire(sessionTokenKey, 60 * 60 * 24) // 24 hr 過期
}

// 測試函數
;(async () => {
  try {
    await checkPhoneNumber('1234567890', 'session1')
    console.log('Phone number check passed.')
  } catch (error) {
    console.error(error)
  }

  await client.quit()
})()

// 這段代碼中，我們使用了 Redis 的 `ZSET` 來追踪每個 `phoneNumber` 的輸入次數和時間，並使用 `HASH` 來追踪每個 `sessionToken` 中的不同 `phoneNumber`。這樣可以有效地實現我們的需求。
