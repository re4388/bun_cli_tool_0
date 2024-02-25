import moment from 'moment-timezone'
import { writeJsonFile } from 'write-json-file'
const csv = require('csvtojson')

/**
 *
 * 1. 確認我的方法沒有大問題
 *
 * 2. 對系統的影響? 系統負載？
 * 3. 一直以來都這樣還是最近這一個月才可以？ -> 要 dump 過去資料才知道
 *
 *
 *
 */

/** csv file kibana 撈取的大蓋範圍
Feb 21, 2024 @ 09:20:54.882
Feb 22, 2024 @ 09:20:54.882

problem userId link
 https://kibana.wemoscooter.com/goto/406e8c80-d1fa-11ee-839c-5d0452371ff5



 */
const csvFilePath = './2024_feb_22_last24hr_cancelReserve_404.csv'
const jsonArray = await csv().fromFile(csvFilePath)

// 資料轉換
const jsonArray2 = jsonArray.map((item: any) => {
  const agentStr = item.userAgent

  // regex for Android and iOs
  const matchAndroid = /Android/i.test(agentStr)
  const matchiOS = /iOS/i.test(agentStr)
  const match = item.path.match(/\/(\d+)$/)

  const getUserAgent2 = () => {
    if (matchiOS) return 'iOS'
    else if (matchAndroid) return 'Android'
    else return 'Other'
  }

  return {
    ts: covertTimestampToDate(item.timestamp),
    status: item.status,
    userAgent2: getUserAgent2(),
    rentId: match[1]
  }
})

const totalCount = jsonArray2.length
console.log(`取消預約 404 的 全部資料量/API筆數: : ${totalCount}`)

////////// iso 資訊

show_iOS_Info()

////////// android 資訊
show_android_info()

////////////// retry 資訊 ///////////
const ios404 = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
  return j.status === '404' && j.userAgent2 === 'iOS'
})

const Android404 = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
  return j.status === '404' && j.userAgent2 === 'Android'
})
console.log('========= retry check')
getPossibleRetryPattern(ios404)
console.log('===============')
getPossibleRetryPattern(Android404)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// HELPERS /////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getPossibleRetryPattern(data404Arg: any) {
  // const ios404Count = ios404.length

  let data404PerMin = getRepeatedCountInMinInterval(data404Arg)
  // console.log('------->data404PerMin: ', data404PerMin[0])
  // console.log('------->ios404Min: ', data404PerMin)

  // 移除單位時間內(min)重複的 rentId, 譬如如果 一分鐘內打3筆，就變成一筆即可 -> 方便 inspect data
  // const ios404MinRemoveDuplicate = removeDuplicates(ios404Min)
  // await writeJsonFile('./ios404Min2.json', ios404MinRemoveDuplicate)

  const data404MinCount = data404PerMin.length

  let data404MinCountAbove1 = data404PerMin
    .filter((i) => i.rentId_repeated_count_in_this_min > 1)
    .sort(
      // @ts-ignore
      (a, b) => a.rentId_repeated_count_in_this_min > b.rentId_repeated_count_in_this_min
    )
  const data404MinCountAbove1Count = data404MinCountAbove1.length

  console.log('404呼叫總次數[每分鐘統計]: ', data404MinCount)
  console.log('其中是重複的rentId[每分鐘統計]: ', data404MinCountAbove1Count)
  console.log(
    '每一分鐘內，所有的404錯誤的 api中, 有多大比例的 api 是重複呼叫的?',
    Number(data404MinCountAbove1Count / data404MinCount).toFixed(2)
  )

  console.log('呼叫的 pattern, 類似一分鐘打幾次，看匯出的json')
}

/////////////////////////////

/**
 *
 * 統計，每一分鐘內，IOS 有多少呼叫重複 rentId的紀錄
 * 如果有的話，次數是多少
 * 類似如果有211個
 * 那這每一個裡面，一分鐘呼叫幾次
 */
function getRepeatedCountInMinInterval(dataFrom404: any) {
  const resultArr: {
    ts: moment.Moment
    status: any
    userAgent2: any
    rentId: any
    // @ts-ignore
    rentId_repeated_count_in_this_min: any
  }[] = []

  // Group entries by minute
  const groupedByMinute = dataFrom404.reduce((acc: any, entry: any) => {
    const roundedTs = entry.ts.clone().startOf('minute').toISOString()
    acc[roundedTs] = acc[roundedTs] || []
    acc[roundedTs].push(entry)
    return acc
  }, {})

  // Process each minute group
  for (const [minute, entries] of Object.entries(groupedByMinute)) {
    const rentIdCountMap = {}

    // Count repeated rentIds within the minute
    // @ts-ignore
    entries.forEach((entry: any) => {
      // @ts-ignore
      rentIdCountMap[entry.rentId] = (rentIdCountMap[entry.rentId] || 0) + 1
    })

    // Create transformed entries
    // @ts-ignore
    entries.forEach((entry) => {
      const transformedEntry = {
        ts: moment(minute),
        status: entry.status,
        userAgent2: entry.userAgent2,
        rentId: entry.rentId,
        // @ts-ignore
        rentId_repeated_count_in_this_min: rentIdCountMap[entry.rentId]
      }

      resultArr.push(transformedEntry)
    })
  }

  return resultArr
}

function show_iOS_Info() {
  console.log('==================  iOS  =============================')
  const iosData = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
    return j.userAgent2 === 'iOS'
  })

  const iosCount = iosData.length
  console.log(`iosCount: ${iosCount}`)
  console.log('------->ratio/total: ', Number(iosCount / totalCount).toFixed(2))

  const ios200Count = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
    return j.status === '200' && j.userAgent2 === 'iOS'
  }).length
  console.log('------->ios200Count: ', ios200Count)
  console.log('------->ratio: ', Number(ios200Count / iosCount).toFixed(2))

  const ios404Count = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
    return j.status === '404' && j.userAgent2 === 'iOS'
  }).length
  console.log('------->ios404Count: ', ios404Count)
  console.log('------->ratio: ', Number(ios404Count / iosCount).toFixed(2))

  const ios401Count = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
    return j.status === '401' && j.userAgent2 === 'iOS'
  }).length
  console.log('------->ios401Count: ', ios401Count)
  console.log('------->ratio: ', Number(ios401Count / iosCount).toFixed(2))

  const iosTimeoutCount = jsonArray2.filter(
    (j: { status: string; userAgent2: string }) => {
      return j.status === '-' && j.userAgent2 === 'iOS'
    }
  ).length
  console.log('------->iosTimeoutCount: ', iosTimeoutCount)
  console.log('------->ratio: ', Number(iosTimeoutCount / iosCount).toFixed(2))
}

function show_android_info() {
  console.log('==================  Android  =============================')

  //////////////////////////////////////////////////

  const AndroidCount = jsonArray2.filter((j: { status: string; userAgent2: string }) => {
    return j.userAgent2 === 'Android'
  }).length
  console.log(`AndroidCount: ${AndroidCount}`)
  console.log('------->ratio/total: ', Number(AndroidCount / totalCount).toFixed(2))

  const Android200Count = jsonArray2.filter(
    (j: { status: string; userAgent2: string }) => {
      return j.status === '200' && j.userAgent2 === 'Android'
    }
  ).length
  console.log('------->Android200Count: ', Android200Count)
  console.log('------->ratio: ', Number(Android200Count / AndroidCount).toFixed(2))

  const Android404Count = jsonArray2.filter(
    (j: { status: string; userAgent2: string }) => {
      return j.status === '404' && j.userAgent2 === 'Android'
    }
  ).length
  console.log('------->Android404Count: ', Android404Count)
  console.log('------->ratio: ', Number(Android404Count / AndroidCount).toFixed(2))

  const Android401Count = jsonArray2.filter(
    (j: { status: string; userAgent2: string }) => {
      return j.status === '401' && j.userAgent2 === 'Android'
    }
  ).length
  console.log('------->Android401Count: ', Android401Count)
  console.log('------->ratio: ', Number(Android401Count / AndroidCount).toFixed(2))

  const AndroidTimeoutCount = jsonArray2.filter(
    (j: { status: string; userAgent2: string }) => {
      return j.status === '-' && j.userAgent2 === 'Android'
    }
  ).length
  console.log('------->AndroidTimeoutCount: ', AndroidTimeoutCount)
  console.log('------->ratio: ', Number(AndroidTimeoutCount / AndroidCount).toFixed(2))
}

type MonthMap = Record<
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec',
  number
>
type MonthStr =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec'

export function covertTimestampToDate(timestamp: string) {
  // const timestamp = 'Feb 22, 2024 @ 21:03:57.611';

  // Map month names to their numeric values
  const monthMap: MonthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  }

  // Split the input string into parts
  const [monthStr, day, year, _, timeStr] = timestamp.split(' ')
  // console.log('------->timeStr: ', timeStr)
  // console.log('------->year: ', year)
  // console.log('------->day: ', day)
  //
  // console.log('------->monthStr: ', monthStr)

  // Extract month, hour, minute, second, and millisecond
  const month = monthMap[monthStr as MonthStr]
  const [hour, minute, second] = timeStr.split(':').map(Number)
  const millisecond = Number(timeStr.split('.')[1])

  // Create a new Date object
  const dateObj = new Date(
    Number(year),
    month,
    Number(day.split(',')[0]),
    hour,
    minute,
    second,
    millisecond
  )

  return moment(dateObj)
}

// let a333 = covertTimestampToDate('Feb 22, 2024 @ 21:03:57.611')

function removeDuplicates(inputArray: any[]) {
  const uniqueEntries: any[] = []
  const seenEntries = new Set()

  inputArray.forEach((entry) => {
    const entryKey = `${entry.ts}_${entry.status}_${entry.userAgent2}_${entry.rentId}`
    if (!seenEntries.has(entryKey)) {
      seenEntries.add(entryKey)
      uniqueEntries.push(entry)
    }
  })

  return uniqueEntries
}
