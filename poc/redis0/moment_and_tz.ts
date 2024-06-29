// import moment from 'moment'
// import moment from 'moment-timezone'
// const currentTime = moment()
// console.log('currentTime -->', currentTime.toDate())

// const currentEndAt = currentTime.clone().tz('Asia/Taipei').startOf('day').add(10, 'days')
// console.log('currentEndAt tz ver. -->', currentEndAt.toDate())

// const currentEndAt2 = currentTime.clone().startOf('day').add(10, 'days')
// console.log('currentEndAt no_tz ver-->', currentEndAt2.toDate())

// const detailEndAt = moment(currentEndAt).tz('Asia/Taipei').endOf('day')
// console.log('detailEndAt -->', detailEndAt)

import moment from 'moment-timezone'

// 先設定紐約時間
const newYorkTime = moment.tz('2024-06-28 12:00', 'America/New_York')

// 將紐約時間轉換為倫敦時間
const londonTime = newYorkTime.clone().tz('Europe/London')

console.log('紐約時間:', newYorkTime.toDate()) // 回傳紐約時間
console.log('倫敦時間:', londonTime.toDate()) // 回傳轉換後的倫敦時間
