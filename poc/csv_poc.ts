import assert from 'node:assert'
import fs from 'node:fs'
import os from 'node:os'
import { parse } from 'csv-parse'
// Note, the `stream/promises` module is only available
// starting with Node.js version 16
import { finished } from 'stream/promises'

let titleToVerInfoMap = new Map()
titleToVerInfoMap.set('2024/03', {
  v2: '0',
  v3: '1',
  v4: '12',
  hitCount: '12'
})
titleToVerInfoMap.set('2024/02', {
  v2: '12',
  v3: '33',
  v5: '333',
  hitCount: '33'
})

// Format the Map data
let data = ['Year/Mon,HitCount,VersionDetail']
for (let [key, value] of titleToVerInfoMap) {
  let versionDetail = Object.entries(value)
    .filter(([k, v]) => k !== 'hitCount')
    .map(([k, v]) => `${k}:${v}`)
    .join(' ')
  data.push(`${key},${value.hitCount},${versionDetail}`)
}

// Year/Mon,HitCount,VersionDetail
// 2024/03,12,v2:0 v3:1
// 2024/02,33,v2:12 v3:33

// Prepare the dataset
await fs.promises.writeFile(`./a1.csv`, data.join('\n'))

// Read and process the CSV file
const processFile = async () => {
  // @ts-ignore
  const records = []
  const parser = fs.createReadStream(`./a1.csv`).pipe(
    parse({
      // CSV options if any
    })
  )
  parser.on('readable', function () {
    let record
    while ((record = parser.read()) !== null) {
      // Work with each record
      records.push(record)
    }
  })
  await finished(parser)
  // @ts-ignore
  return records
}
// Parse the CSV content
const records = await processFile()
console.log('------->records: ', records)
// Validate the records
// assert.deepStrictEqual(records, [
//   ['a', 'b', 'c'],
//   ['1', '2', '3']
// ])
