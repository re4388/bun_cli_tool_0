import Redis from 'ioredis'

const redis = new Redis('6379')
redis.flushall()

const PHONE_NUMBER_LIMIT = 3
const TIME_FRAME = 10 * 60 // 10 minutes in seconds
const SESSION_PHONE_LIMIT = 4

async function checkPhoneNumber(
  phoneNumber: string,
  sessionToken: string
): Promise<void> {
  const currentTime = Math.floor(Date.now() / 1000)
  const phoneKey = `phone:${phoneNumber}`
  const sessionKey = `session:${sessionToken}`

  // Remove old entries from the sorted set
  await redis.zremrangebyscore(phoneKey, 0, currentTime - TIME_FRAME)

  // Add the current timestamp to the sorted set
  await redis.zadd(phoneKey, currentTime, currentTime.toString())

  // Get the count of phone number entries in the last 10 minutes
  const phoneCount = await redis.zrangebyscore(
    phoneKey,
    currentTime - TIME_FRAME,
    currentTime
  )
  if (phoneCount.length > PHONE_NUMBER_LIMIT) {
    throw new Error('Phone number has been used more than 3 times in the last 10 minutes')
  }

  // Add the phone number to the session set
  await redis.sadd(sessionKey, phoneNumber)

  // Get the count of unique phone numbers in the session
  const sessionPhoneCount = await redis.scard(sessionKey)
  if (sessionPhoneCount > SESSION_PHONE_LIMIT) {
    throw new Error(
      'More than 4 different phone numbers have been used in the same session'
    )
  }
}

// Example usage
;(async () => {
  try {
    await checkPhoneNumber('1234567890', 'session1')
    console.log('Phone number check passed')
  } catch (error) {
    console.error(error)
  } finally {
    redis.disconnect()
  }
})()
