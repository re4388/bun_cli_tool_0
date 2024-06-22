import Redis from 'ioredis'

// import { expect, test } from 'bun:test'

// test('test work', () => {
//   expect(2 + 2).toBe(4)
// })

const redis = new Redis('6379')
redis.flushall()

async function main() {
  // test req in time frame
  //   await phoneApi('+86 1234567890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 1234567890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 1234567890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 1234567890', 'sdajkfhasdkjlhaksldhf')
  // check dif phone number in the same session
  //   await phoneApi('+86 1234563890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 2234564890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 3234563890', 'sdajkfhasdkjlhaksldhf')
  //   await phoneApi('+86 4234565890', 'sdajkfhasdkjlhaksldhf')
}

main().catch((error) => {
  console.error(`Error: ${error.message}`)
})

/////////////////////// main ///////////////////////

// 速率限制中間件
async function phoneApi(phone: string, sentryToken: string) {
  // 定義速率限制參數
  const LIMIT = 3 // 許可請求的最大數量
  const WINDOW_SIZE_IN_SECONDS = 10 * 60 * 60 // 10 minutes
  // use redis to set phone into the set
  // when we gather 4 different phone numbers in the same session, we throw error
  const differentPhoneCount = await redis.scard('hermes:phoneCheck')
  console.log('differentPhoneCount -->', differentPhoneCount)
  if (differentPhoneCount >= 3) {
    throw Error('Too many requests, please try again later.')
  }
  await redis.sadd('hermes:phoneCheck', phone + sentryToken)

  // sms send rate limit for 3 requests in 10 minutes
  const requestKey = `hermes:phoneRate${phone}`
  const currentCount = await redis.get(requestKey)
  if (currentCount === null) {
    // 如果是第一次請求，初始化計數器並設置過期時間
    await redis.set(requestKey, 1, 'EX', WINDOW_SIZE_IN_SECONDS)

    console.log(`phone ${phone} - 次數 1`)
  } else if (Number(currentCount) < LIMIT) {
    // 如果計數器小於限制值，遞增計數
    await redis.incr(requestKey)
    console.log(`phone ${phone} - 次數 ${parseInt(currentCount) + 1}`)
  } else {
    // 如果超過限制，拒絕請求
    throw Error('Too many requests, please try again later.')
  }
}

// (Josh) 建議可評估以下幾個阻擋機制：
// 身分證 n 分鐘內，嘗試幾次後封鎖 (by ID_card_Number)
// 裝置 n 分鐘內，嘗試幾次後封鎖 (by Device ID)
// 手機發驗證 n 分鐘內，嘗試幾次後封鎖
// 同一身份填幾次不同手機封鎖
//  (Josh) 建議評估用戶於帳戶自行改手機號碼情境，是否加上阻擋機制

// maybe this code is at middleware level
