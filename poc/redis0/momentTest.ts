import moment from 'moment'

// const endAt = moment('2024-06-27T07:01:34.681Z').toISOString()
const endAt = moment('2024-06-27T07:10:34.681Z')
console.log('endAt -->', endAt)

const now = moment()
console.log('now -->', now.toISOString())
const a2 = endAt.diff(now)
console.log('a2 -->', a2)
