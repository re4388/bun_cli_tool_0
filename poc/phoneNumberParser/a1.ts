// import { phone } from 'phone'

// const a1 = `886936675118`
// const a2 = `+886936675118`
// const a3 = `0936675118`

// phone(a1, { country: 'TW' })
// console.log('phone(a1) -->', phone(a1))
// phone(a2)
// console.log('phone(a2) -->', phone(a2))
// phone(a3)
// console.log('phone(a3) -->', phone(a3))

import { parsePhoneNumber } from 'awesome-phonenumber'
const a1 = `886936675118`
const a2 = `+886936675118`
const a3 = `0936675118`

parsePhoneNumber(a1, { regionCode: 'TW' })
console.log('parsePhoneNumber(a1) -->', parsePhoneNumber(a1))
parsePhoneNumber(a2)
console.log('parsePhoneNumber(a2) -->', parsePhoneNumber(a2))
parsePhoneNumber(a3, { regionCode: 'tw' })
console.log('parsePhoneNumber(a3) -->', parsePhoneNumber(a3))
