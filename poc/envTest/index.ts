// const fs = require('fs')
//
// // Read the JSON file
// fs.readFile(
//   '/Users/re4388/project/personal/lang/bun/bun_cli_0/poc/envTest/qat.json',
//   'utf8',
//   (err: any, data: string) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//
//     try {
//       // Parse the JSON data
//       const jsonData = JSON.parse(data)
//       console.log(jsonData)
//       console.log(JSON.stringify(jsonData))
//     } catch (error) {
//       console.error('Error parsing JSON:', error)
//     }
//   }
// )

const a1 = process.env.priceGroupSetting

const a2 = JSON.parse(a1!)
console.log('------->a2: ', a2)
for (const a2Element of a2) {
  console.log('------->a2Element: ', a2Element)
}
