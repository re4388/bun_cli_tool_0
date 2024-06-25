import Redis from 'ioredis'
import * as R from 'ramda'

// import { expect, test } from 'bun:test'

// test('test work', () => {
//   expect(2 + 2).toBe(4)
// })

const client = new Redis('6379')
client.flushall()

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
interface ListElement {
  timestamp: number
  element: string
}


async function main2(phone: string, token: string){
  const listName = token
  const now = Date.now()
  const data = { now, phone }
  const reply = await client.lpush(listName, JSON.stringify(data))


}





async function addElementToList(listName: string, element: string): Promise<void> {
  const timestamp = Date.now()
  const data: ListElement = { timestamp, element }
  try {
    const reply = await client.lpush(listName, JSON.stringify(data))
    console.log('Element added to list:', reply)
  } catch (err) {
    console.error('Error adding element to list:', err)
  }
}

// 使用範例
addElementToList('myList', 'exampleElement')

async function getElementsFromLastMinutes(
  listName: string,
  minutes: number
): Promise<string[]> {
  const minutesAgo = Date.now() - minutes * 60 * 1000

  try {
    // get all elements from the list
    const elements = await client.lrange(listName, 0, -1)
    // only keep the elements that are older than the specified time
    const recentElements = elements
      .map((element) => JSON.parse(element) as ListElement)
      .filter((item) => item.timestamp >= minutesAgo)
      .map((item) => item.element)

    return recentElements
  } catch (err) {
    console.error('Error fetching elements from list:', err)
    throw err
  }
}

async function rateLimiter(phoneNumber: string, sentryToken: string) {
  const listKey = `phoneRateLimiter:${sentryToken}`
  const elements = await getElementsFromLastMinutes(listKey, 10)
  if (R.uniq(elements).length > 3) {
    throw new Error('detect 3 different phone number, please try again later.')
    // add this phone number to the blacklist db
  }

  addElementToList(`listKey`, phoneNumber)
}
