import { JWT } from 'google-auth-library'
import creds from '../secret/spread-sheets.json' // the file saved above
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { split } from 'ramda'
import { appendFile } from 'node:fs/promises'

///////////////////////////////////
///////// CONST START//////////////
///////////////////////////////////

const baseFileFolder = `/Users/re4388/project/personal/lang/bun/bun_cli_0/poc/deprecated_endpoint`
///////////////////////////////////
///////// CONST END //////////////
///////////////////////////////////

function isSheetMatching(sheet: string) {
  const regexForSheetName = /\b\d{4}\/\d{2}\b/
  return sheet.match(regexForSheetName)
}

async function getSheetDataIntoFileSystem() {
  const doc = await initDoc()
  console.log(doc.title)

  const sheetCount = doc.sheetCount
  console.log('sheetCount', sheetCount)
  const matchingSheets = getMatchingSheet(doc)

  for (const sheet of matchingSheets) {
    const sheetTitle = sheet.title
    console.log('------->title: ', sheetTitle)
    // console.log(sheet.rowCount)
    const rows = await sheet.getRows() // can pass in { limit, offset }
    // console.log('rows', rows)
    for (const row of rows) {
      const endpoint = row.get('Endpoint')
      const hitCount = row.get('Hit Count')
      const versionDetail = row.get('Version Details')
      console.log('hitCount', hitCount)
      console.log('endpoint', endpoint)
      let fileName = hashApiStringToFileName(endpoint).toString()
      console.log('------->fileName: ', fileName)
      const versionDetailReReversed = reverseCovertVersionDetailString(versionDetail)
      const versionDetailReReversedWithTitle = sheetTitle + '\n' + versionDetailReReversed

      const filePath = baseFileFolder + '/' + fileName
      const file = Bun.file(filePath)
      if (!(await file.exists())) {
        console.log('file not exist')
        await Bun.write(filePath, versionDetailReReversedWithTitle)
      } else {
        console.log('file exist')
        // check if the sheetTitle already in the file
        const fileContent = await file.text()
        if (fileContent.includes(sheetTitle)) {
          console.log(' sheetTitle already exist')
        } else {
          console.log(' sheetTitle not exit, will add to the file')
          await appendFile(filePath, versionDetailReReversedWithTitle)
        }
      }

      break
    }
    break
  }
}

await getSheetDataIntoFileSystem()

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

async function initDoc() {
  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ]
  const Google_DOC_ID = `19N5k1kAVBtYPo06QFkP4i1ZFzWj0YLzOnW6ohUDWO1w`
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
  return str.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0)
  }, 0)
}

const testMock = `v2: 0, v3: 0, v4: 0, v5: 0, v6: 0, v7: 0, v8: 0, v9: 0, v10: 0, v11: 0, v12: 0, v13: 0, v14: 0, v15: 0, v16: 0, v17: 0, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 0`

function getMatchingSheet(doc: any) {
  const matchingSheets: any[] = []
  doc.sheetsByIndex.forEach((sheet: any, _index: string) => {
    if (isSheetMatching(sheet.title)) {
      matchingSheets.push(sheet)
    }
  })
  return matchingSheets
}

function reverseCovertVersionDetailString(s1: string) {
  const arr = s1.split(', ')
  let res = arr.reverse().join('\n')
  return res
}

// let a22 = reverseCovertVersionDetailString(testMock)
// console.log(a22)

/**
 * s1 is like `v2: 0, v3: 0, v4: 0, v5: 0, v6: 0, v7: 0, v8: 0, v9: 0, v10: 0, v11: 0, v12: 0, v13: 0, v14: 0, v15: 0, v16: 0, v17: 0, v18: 0, v19: 0, v20: 0, v21: 0, v22: 0, v23: 0`
 * @param s1
 */
function covertVersionDetailToObj(s1: string) {
  const arr = s1.split(', ')
  const obj = arr.reduce(
    (acc, curr) => {
      const [key, value] = split(': ', curr)
      acc[key] = value
      return acc
    },
    {} as { [key: string]: string }
  )
  return obj
}

// let res = covertVersionDetailToObj(testMock)
// console.log('res', res)
