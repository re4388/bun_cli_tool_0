import Redis from 'ioredis'

const client = new Redis('6379')

client.flushall()

interface DataElement {
  timestamp: number
  value: string
}

// 添加數據到有序集合
async function addDataToSortedSet(setName: string, value: string): Promise<void> {
  const timestamp = Date.now()
  try {
    const reply = await client.zadd(
      setName,
      timestamp,
      JSON.stringify({ timestamp, value })
    )
    console.log('Data added to sorted set:', reply)
  } catch (err) {
    console.error('Error adding data to sorted set:', err)
  }
}

// 獲取過去10分鐘的數據
async function getDataFromLast10Minutes(setName: string): Promise<DataElement[]> {
  const tenMinutesAgo = Date.now() - 10 * 60 * 1000
  try {
    const elements = await client.zrangebyscore(setName, tenMinutesAgo, Date.now())
    return elements.map((element) => JSON.parse(element) as DataElement)
  } catch (err) {
    console.error('Error fetching data from sorted set:', err)
    throw err
  }
}

// 使用範例
;(async () => {
  // 添加一些數據到有序集合中
  await addDataToSortedSet('mySortedSet', 'exampleValue1')
  await addDataToSortedSet('mySortedSet', 'exampleValue2')
  await addDataToSortedSet('mySortedSet', 'exampleValue3')
  await addDataToSortedSet('mySortedSet', 'exampleValue4')
  await addDataToSortedSet('mySortedSet', 'exampleValue4')

  // 獲取過去10分鐘的數據
  try {
    const data = await getDataFromLast10Minutes('mySortedSet')
    console.log('Data from last 10 minutes:', data)
  } catch (err) {
    console.error('Error:', err)
  }
})()
