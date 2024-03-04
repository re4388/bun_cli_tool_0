import crypto from 'crypto'
import { JWT } from 'google-auth-library'
import creds from '../../secret/spread-sheets.json' // the file saved above
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { split } from 'ramda'
import { appendFile } from 'node:fs/promises'
import { deprecatedEndpointBasePath, hashString } from './utils.ts'
const fs = require('fs').promises

///////////////////////////////////////
///////// GLOBAL VARIABLE//////////////
///////////////////////////////////////
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
]
const Google_DOC_ID = `19N5k1kAVBtYPo06QFkP4i1ZFzWj0YLzOnW6ohUDWO1w`
const hashPath = `${deprecatedEndpointBasePath}/hash/`

const titleToVerInfoMap = new Map()
const endpointList: string[] = []
const filePaths: string[] = []
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

function isSheetMatching(sheet: string) {
  const regexForSheetName = /\b\d{4}\/\d{2}\b/
  return sheet.match(regexForSheetName)
}

async function getSheetDataIntoFileSystem() {
  const doc = await initDoc()
  // console.log(doc.title)

  const numberOfSheet = doc.sheetCount
  // console.log('numberOfSheet', numberOfSheet)
  const matchingSheets = getMatchingSheet(doc)

  let sheetCount = 0
  for (const sheet of matchingSheets) {
    sheetCount++
    const sheetTitle = sheet.title
    // console.log('------->title: ', sheetTitle)
    // console.log(sheet.rowCount)
    const rows = await sheet.getRows() // can pass in { limit, offset }
    // console.log('rows', rows)

    let rowCount = 0
    for (const row of rows) {
      rowCount++
      const endpoint = row.get('Endpoint')
      endpointList.push(endpoint)
      const hitCount = row.get('Hit Count')
      const versionDetail = row.get('Version Details')
      // console.log('hitCount', hitCount)
      // console.log('endpoint', endpoint)
      const filePath = hashPath + hashString(endpoint).toString()
      updateTitleToVerInfoMap(sheetTitle, versionDetail, hitCount)

      const fileExist = await Bun.file(filePath).exists()
      const csvData = covertMapToCSV(sheetTitle, fileExist)

      if (fileExist) {
        await appendFile(filePath, '\n' + csvData.join('\n'))
      } else {
        await fs.writeFile(filePath, csvData.join('\n'))
      }
      // test purpose
      // if (rowCount === 5) break
    }
    titleToVerInfoMap.clear()
    // clean up map
    // test purpose
    // if (sheetCount === 5) break
  }
}

await getSheetDataIntoFileSystem()
// console.log(titleToVerInfoMap)
await saveEndpointListIntoJSON()

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
async function saveEndpointListIntoJSON() {
  // Convert the data to JSON and write it to a file
  try {
    await fs.writeFile(
      `${deprecatedEndpointBasePath}/endpointList.json`,
      JSON.stringify([...new Set(endpointList)], null, 2)
    )
  } catch (error) {
    console.error(error)
  }
}

function covertMapToCSV(sheetTitle: string, fileExist: boolean) {
  let data = []
  if (!fileExist) {
    data.push('y/m,#,info')
  }
  const value = titleToVerInfoMap.get(sheetTitle)
  let versionDetail = Object.entries(value)
    .filter(([k, v]) => k !== 'hitCount')
    .map(([k, v]) => `${k}:${v}`)
    .join(' ')
  data.push(`${sheetTitle},${value.hitCount},${versionDetail}`)

  return data
}

async function initDoc() {
  const doc = new GoogleSpreadsheet(
    Google_DOC_ID,
    new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: SCOPES
    })
  )
  await doc.loadInfo()
  return doc
}

function hashApiStringToFileName(str: string) {
  let hash = crypto.createHash('sha256')
  hash.update(str)
  return hash.digest('hex')
}

function getMatchingSheet(doc: any) {
  const matchingSheets: any[] = []
  doc.sheetsByIndex.forEach((sheet: any, _index: string) => {
    if (isSheetMatching(sheet.title)) {
      matchingSheets.push(sheet)
    }
  })
  return matchingSheets
}

function updateTitleToVerInfoMap(
  sheetTitle: string,
  versionDetail: string,
  hitCount: number
) {
  if (versionDetail === undefined) {
    return
  }
  const arr = versionDetail.split(', ')
  const obj = arr.reduce(
    (acc, curr) => {
      const [key, value] = split(': ', curr)
      acc[key] = value
      return acc
    },
    {} as { [key: string]: string }
  )
  obj['hitCount'] = String(hitCount)
  titleToVerInfoMap.set(sheetTitle, obj)
}
