import crypto from 'crypto'
import { JWT } from 'google-auth-library'
import creds from '../../secret/spread-sheets.json' // the file saved above
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { split } from 'ramda'
import { appendFile } from 'node:fs/promises'
// import { deprecatedEndpointBasePath, hashString } from './utils.ts'
const fs = require('fs').promises

///////////////////////////////////////
///////// GLOBAL VARIABLE//////////////
///////////////////////////////////////
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
]
// https://docs.google.com/spreadsheets/d/12T2kHhUO8EUBNvsHrfS4X1OiedUi0P1P5vyT9qd7vGE/edit#gid=229636908
const Google_DOC_ID = `12T2kHhUO8EUBNvsHrfS4X1OiedUi0P1P5vyT9qd7vGE`
// const hashPath = `${deprecatedEndpointBasePath}/hash/`

const itemList: any[] = []
///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

async function getSheetDataIntoFileSystem() {
  const doc = await initDoc()
  console.log(doc.title)
  const numberOfSheet = doc.sheetCount
  console.log('numberOfSheet', numberOfSheet)
  // const matchingSheets = checkingSheet(doc)

  let sheet = doc.sheetsByIndex[19]
  const rows = await sheet.getRows()

  for (let i = 1; i < rows.length; i++) {
    const _id = rows[0].get('$id')
    const _type0 = rows[0].get('$type')
    const _name = rows[0].get('$name')
    const _desc = rows[0].get('$description')
    const _old = rows[0].get('$old')
    const _dup = rows[0].get('$duplicable')
    const _rol2 = rows[0].get('$role2Perm')
    const _rol3 = rows[0].get('$role3Perm')
    const _rol4 = rows[0].get('$role4Perm')
    const _rol5 = rows[0].get('$role5Perm')
    const _rol6 = rows[0].get('$role6Perm')
    const _rol7 = rows[0].get('$role7Perm')
    const _rol8 = rows[0].get('$role8Perm')
    const _rol9 = rows[0].get('$role9Perm')
    const _rol10 = rows[0].get('$role10Perm')
    const _rol11 = rows[0].get('$role11Perm')
    const _rol12 = rows[0].get('$role12Perm')
    const _rol13 = rows[0].get('$role13Perm')
    const _rol14 = rows[0].get('$role14Perm')
    const _rol15 = rows[0].get('$role15Perm')
    const _rol16 = rows[0].get('$role16Perm')
    const _rol17 = rows[0].get('$role17Perm')
    const _rol18 = rows[0].get('$role18Perm')
    const _rdMeet = rows[0].get('RD Meeting')
    const id = rows[i].get('$id')
    const type0 = rows[i].get('$type')
    const name = rows[i].get('$name')
    const desc = rows[i].get('$description')
    const old = rows[i].get('$old')
    const dup = rows[i].get('$duplicable')
    const rol2 = rows[i].get('$role2Perm')
    const rol3 = rows[i].get('$role3Perm')
    const rol4 = rows[i].get('$role4Perm')
    const rol5 = rows[i].get('$role5Perm')
    const rol6 = rows[i].get('$role6Perm')
    const rol7 = rows[i].get('$role7Perm')
    const rol8 = rows[i].get('$role8Perm')
    const rol9 = rows[i].get('$role9Perm')
    const rol10 = rows[i].get('$role10Perm')
    const rol11 = rows[i].get('$role11Perm')
    const rol12 = rows[i].get('$role12Perm')
    const rol13 = rows[i].get('$role13Perm')
    const rol14 = rows[i].get('$role14Perm')
    const rol15 = rows[i].get('$role15Perm')
    const rol16 = rows[i].get('$role16Perm')
    const rol17 = rows[i].get('$role17Perm')
    const rol18 = rows[i].get('$role18Perm')
    const rdMeet = rows[i].get('RD Meeting')

    itemList.push({
      [_id]: id,
      [_type0]: type0,
      [_name]: name,
      [_desc]: desc,
      [_old]: old,
      [_dup]: dup,
      [_rol2]: rol2,
      [_rol3]: rol3,
      [_rol4]: rol4,
      [_rol5]: rol5,
      [_rol6]: rol6,
      [_rol7]: rol7,
      [_rol8]: rol8,
      [_rol9]: rol9,
      [_rol10]: rol10,
      [_rol11]: rol11,
      [_rol12]: rol12,
      [_rol13]: rol13,
      [_rol14]: rol14,
      [_rol15]: rol15,
      [_rol16]: rol16,
      [_rol17]: rol17,
      [_rol18]: rol18,
      [_rdMeet]: rdMeet
    })
  }
}

await getSheetDataIntoFileSystem()
console.log(itemList)
// console.log(titleToVerInfoMap)
await saveData(itemList)

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
async function saveData(itemList: any) {
  try {
    await fs.writeFile(`./data.json`, JSON.stringify(itemList, null, 2))
  } catch (error) {
    console.error(error)
  }
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
