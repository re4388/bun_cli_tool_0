// import crypto from 'crypto'

// // https://news.ycombinator.com/item?id=40582365
// function makeSlugV1(length: number): string {
//   // 有效字元, 這些是我們要用來產生 slug 的字元
//   const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   // 用內建的 crypto.randomBytes 產生一個亂數 in bytes
//   const randomBytes = crypto.randomBytes(length)

//   let result = ''
//   for (let i = 0; i < length; i++) {
//     // 取出 randomBytes 中的一個 byte
//     const randomByte = randomBytes[i]

//     // 取餘數 確保 randomByte 在 validChars 範圍內
//     // the valid chars string is 62 characters, so naively using a modulo on a random byte will technically introduce a bias (since dividing 256 values by 62 leaves a remainder). I don't expect it to really matter here, but since you're putting in the effort of using crypto.randomBytes I figured you might appreciate the nitpick ;). see https://www.pcg-random.org/posts/bounded-rands.html
//     // or just use this https://github.com/paralleldrive/cuid2
//     const idx = randomByte % validChars.length

//     // 從有效字元取出一個字元
//     result += validChars[idx]
//   }
//   return result
// }

// let a2 = makeSlugV1(5)
// console.log('a2', a2)

// // https://news.ycombinator.com/item?id=40583239
// function makeSlugV2(length: number): string {
//   const alphabet = '0123456789abcdefghjkmnpqrstvwxyz'
//   let result = ''
//   for (let i = 0; i < length; i++) {
//     result += alphabet[crypto.randomInt(alphabet.length)]
//   }
//   return result
// }

// type TABLE_NAME_TO_ID_SPEC = {
//   [tableName: string]: {
//     prefix: string
//     length: number
//   }
// }

// const table_name_to_id_spec: TABLE_NAME_TO_ID_SPEC = {
//   table1: { prefix: 'sc', length: 10 },
//   table2: { prefix: 'py', length: 10 },
//   table3: { prefix: 'jk', length: 10 }
// }

// // table_name_to_id_spec['table1'].prefix

// function makeId(tableName: string): string {
//   const idSpec = table_name_to_id_spec[tableName]
//   console.log('idSpec', idSpec)
//   const prefix = idSpec.prefix
//   const slugLength = idSpec.length - prefix.length - 1
//   return `${prefix}_${makeSlugV2(slugLength)}`
// }

// const res1 = makeId('table1')
// console.log('res1', res1)
