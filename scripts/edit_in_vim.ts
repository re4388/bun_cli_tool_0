import clipboard from 'clipboardy'
import moment from 'moment-timezone'
import { promises as fs } from 'fs'
import { openInIterm2 } from '../util/openInIterm2.ts'

// 建立路徑
const filePath = `/Users/re4388/tmp/tmp_${moment.utc(Date.now()).tz('Asia/Taipei').format()}`

// 拿到剪貼版的資料
let copied = clipboard.readSync()

// 寫入路徑
try {
  await fs.writeFile(filePath, copied)
} catch (err) {
  console.error('Error creating file:', err)
}

// // 建立 script and 跑起來
await openInIterm2(`nvim ${filePath}`)
