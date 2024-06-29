import Redis from 'ioredis'
// import { getRepository } from 'typeorm'
// import { BlockRecord } from './entities/BlockRecord' // 假設BlockRecord是你的TypeORM實體

const redis = new Redis('6379') // 初始化 Redis 客戶端
redis.flushall()

interface RateLimitData {
  isBlocked: boolean
  counter: number
}

// const phones = ['0934441', '0934441', '0934442', '0934441', '0934441']
// for (const phone of phones) {
//   console.log('phone -->', phone)
//   await rateLimit2(phone)
// }

await Promise.all([
  rateLimit2V6('0934441'),
  rateLimit2V6('0934441')
  // rateLimit2V4('0934441')
])
const value = await redis.get(`PhoneRepeated4TimesIn10Min:0934441`)
console.log('value -->', value)

async function rateLimit2V6(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const initialTTL = 600 // 10 分鐘
  const extendedTTL = 10800 // 180 分鐘

  while (true) {
    try {
      await redis.watch(key)

      const value = await redis.get(key)
      console.log('value -->', value)

      if (value === null) {
        const data: RateLimitData = {
          isBlocked: false,
          counter: 1
        }

        const result = await redis
          .multi()
          .set(key, JSON.stringify(data), 'EX', initialTTL)
          .exec()

        if (result === null) {
          console.log('retry')
          continue // 事務失敗,重試
        }

        return // 成功設置初始值
      } else {
        const data: RateLimitData = JSON.parse(value)

        if (data.isBlocked) {
          throw new Error('Rate limit exceeded, blocking action performed')
        } else {
          if (data.counter < 3) {
            data.counter += 1

            const result = await redis
              .multi()
              .set(key, JSON.stringify(data), 'EX', initialTTL)
              .exec()

            if (result === null) {
              continue // 事務失敗,重試
            }

            return // 成功更新計數器
          } else {
            data.isBlocked = true
            data.counter += 1

            const result = await redis
              .multi()
              .set(key, JSON.stringify(data), 'EX', extendedTTL)
              .exec()

            if (result === null) {
              continue // 事務失敗,重試
            }

            throw new Error('Rate limit exceeded, blocking action performed')
          }
        }
      }
    } finally {
      await redis.unwatch()
    }
  }
}

async function rateLimit2V5(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const initialTTL = 600 // 10 分鐘
  const extendedTTL = 10800 // 180 分鐘

  // Watch the key for changes, start a transaction
  await redis.watch(key)

  // Get the current value and TTL
  const multi = redis.multi()
  multi.get(key)
  multi.ttl(key)
  //@ts-ignore
  const [getArr, ttlArr] = await multi.exec()
  console.log('ttlArr -->', ttlArr)
  console.log('getArr -->', getArr)

  let value: string | null = getArr[1]
  const ttl: number = ttlArr[1]
  console.log('value -->', value)
  console.log('ttl -->', ttl)

  if (value === null) {
    // Key 不存在，創建初始值並設置 TTL
    let data = { isBlocked: false, counter: 1 }
    await redis.multi().set(key, JSON.stringify(data), 'EX', initialTTL).exec()
  } else {
    let data = JSON.parse(value)
    const counter = data.counter

    if (data.isBlocked) {
      // 如果已經被封鎖，拋出錯誤
      throw new Error('Rate limit exceeded, blocking action performed')
    } else {
      // 再次 Watch the key for changes
      await redis.watch(key)

      const multi = redis.multi()
      if (counter < 3) {
        // 增加計數
        // data.counter += 1
        multi.set(
          key,
          JSON.stringify({
            isBlocked: false,
            counter: counter + 1
          }),
          'EX',
          Math.max(ttl, initialTTL)
        )
      } else {
        // 設置為封鎖狀態並延長TTL
        // data.isBlocked = true
        // data.counter += 1
        multi.set(
          key,
          JSON.stringify({
            isBlocked: true,
            counter: counter + 1
          }),
          'EX',
          extendedTTL
        )
      }

      //@ts-ignore
      const [execErr, execResult] = await multi.exec()
      console.log('execResult -->', execResult)
      console.log('execErr -->', execErr)

      if (execErr !== null) {
        // 如果 execResult 為 null，表示 watch 觸發了重試
        throw new Error('Transaction failed due to concurrent update')
      }

      if (data.counter >= 3) {
        throw new Error('Rate limit exceeded, blocking action performed')
      }
    }
  }
}

async function rateLimit2V4(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const initialTTL = 600 // 10 分鐘
  const extendedTTL = 10800 // 180 分鐘

  const result = await redis.multi().incr(`${key}:counter`).ttl(key).exec()

  const counter = result![0][1] as number
  const ttl = result![1][1] as number
  console.log('counter -->', counter)
  console.log('ttl -->', ttl)

  if (ttl === -2) {
    await redis
      .multi()
      .set(key, JSON.stringify({ isBlocked: false, counter: 1 }), 'EX', initialTTL)
      .incr(`${key}:counter`)
      .exec()
  } else if (ttl > 0 && counter >= 3) {
    await redis
      .multi()
      .set(key, JSON.stringify({ isBlocked: true, counter }), 'EX', extendedTTL)
      .expire(`${key}:counter`, extendedTTL)
      .exec()
    throw new Error('Rate limit exceeded, blocking action performed')
  } else {
    if (ttl > 0) {
      await redis.expire(key, initialTTL)
    }
  }
}

async function rateLimit2V3(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const initialTTL = 600
  const extendedTTL = 10800

  const multi = redis.multi()
  multi.get(key)
  multi.ttl(key)
  //@ts-ignore
  const [value, ttl] = await multi.exec()
  console.log('ttl -->', ttl)
  console.log('value -->', value)

  if (value[1] === null) {
    const data: RateLimitData = { isBlocked: false, counter: 1 }
    await redis.set(key, JSON.stringify(data), 'EX', initialTTL)
  } else {
    const data: RateLimitData = JSON.parse(value[1])
    console.log('data -->', data)
    if (data.isBlocked) {
      throw new Error('Rate limit exceeded, blocking action performed')
    } else {
      multi.watch(key)
      if (data.counter < 3) {
        data.counter += 1
        multi.set(key, JSON.stringify(data), 'EX', Math.max(ttl, initialTTL))
      } else {
        data.isBlocked = true
        data.counter += 1
        multi.set(key, JSON.stringify(data), 'EX', extendedTTL)
      }
      await multi.exec()
      if (data.counter >= 3) {
        throw new Error('Rate limit exceeded, blocking action performed')
      }
    }
  }
}

// async function rateLimit2V2(phone: string): Promise<void> {
//   const key = `PhoneRepeated4TimesIn10Min:${phone}`
//   const initialTTL = 600 // 10 分鐘
//   const extendedTTL = 10800 // 180 分鐘

//   const result = await redis.multi().incr(`${key}:counter`).ttl(key).exec()
//   console.log('result -->', result)

//   const counter = result![0][1]
//   const ttl = result![1][1]

//   if (ttl === -2) {
//     await redis
//       .multi()
//       .set(key, JSON.stringify({ isBlocked: false, counter: 1 }), 'EX', initialTTL)
//       .incr(`${key}:counter`)
//       .exec()
//     //@ts-ignore
//   } else if (ttl > 0 && counter >= 3) {
//     await redis
//       .multi()
//       .set(key, JSON.stringify({ isBlocked: true, counter }), 'EX', extendedTTL)
//       .expire(`${key}:counter`, extendedTTL)
//       .exec()
//     throw new Error('Rate limit exceeded, blocking action performed')
//   } else {
//     //@ts-ignore
//     if (ttl > 0) {
//       await redis.expire(key, initialTTL)
//     }
//   }
// }

async function rateLimit2(phone: string): Promise<void> {
  const key = `PhoneRepeated4TimesIn10Min:${phone}`
  const initialTTL = 600 // 10 分鐘
  const extendedTTL = 10800 // 180 分鐘

  const value = await redis.get(key)

  if (value === null) {
    // Key 不存在，創建初始值並設置 TTL
    const data: RateLimitData = {
      isBlocked: false,
      counter: 1
    }
    await redis.set(key, JSON.stringify(data), 'EX', initialTTL)
  } else {
    const data: RateLimitData = JSON.parse(value)

    if (data.isBlocked) {
      // 如果已經被封鎖，拋出錯誤
      throw new Error('Rate limit exceeded, blocking action performed')
    } else {
      if (data.counter < 3) {
        // 增加計數
        data.counter += 1
        await redis.set(key, JSON.stringify(data), 'EX', initialTTL)
      } else {
        // 設置為封鎖狀態並延長TTL
        data.isBlocked = true
        data.counter += 1 // 達到3次後還是應該增加計數
        await redis.set(key, JSON.stringify(data), 'EX', extendedTTL)
        // 拋出錯誤
        throw new Error('Rate limit exceeded, blocking action performed')
      }
    }
  }
}
