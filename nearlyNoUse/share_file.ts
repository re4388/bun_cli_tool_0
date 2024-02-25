// Description: Select a file in Finder. Creates tunnel and copies link to clipboard.
import { tunnelmole } from 'tunnelmole'
import { question, $ } from 'zx'
// import { $ } from 'bun'
const tmp = require('scripts/tmp.ts')
const path = require('node:path')
import * as R from 'ramda'
import { ln } from '../util/symbolicLink.ts'
import http from 'http'
const handler = require('serve-handler')
import chalk from 'chalk'
import exitHook from 'exit-hook'
import { isFileExist } from '../util/isFileExist.ts'
import clipboard from 'clipboardy'
import { errLog } from '../util/errorLog.ts'
import { pushTextToLine } from '../util/pusgToLine'
import ngrok from 'ngrok'
//

let filePath = await question('filePath to share')
if (!isFileExist(filePath.trim())) {
  throw new Error(`File not found: ${filePath}`)
}

await $`node /Users/re4388/project/personal/nodejs/robotJS/share.js ${filePath}`

//
//
//
//
// const filePath =
//   '/Users/re4388/Library/Containers/oss.krtirtho.spotube/Data/Library/Caches/Electrify_My_Soul-SAMSONS.m4a'
//
// const baseName = path.basename(filePath) // -> /Users/re4388/.config/nvim
// const dirname = path.dirname(filePath) // -> t1.md
//
// // in case we have filename like `test 2.txt` ->  `text-2.txt`
// let baseNameCleaned = baseName.replaceAll(' ', '-').trim()
//
// // https://github.com/vercel/serve-handler?tab=readme-ov-file#options
// const server = http.createServer((req, res) => {
//   handler(req, res, {
//     public: dirname
//   }).catch((err: any) => {
//     errLog(err)
//     res.writeHead(500)
//     res.end('Internal Server Error')
//   })
// })
//
// try {
//   let port = 3033
//   server.listen(port, async () => {
//     console.log(`server is listening on ${port}`)
//     // use tunnelmole tunnel to public
//     // const publicUrl = await tunnelmole({ port })
//     // const res = await $`ngrok http 3033`
//     // const stdout = res.stdout
//     // const publicUrl = await ngrok.connect({ port })
//     // let shareLink = publicUrl + '/' + baseNameCleaned
//     // console.log(chalk.yellow(`${shareLink} copied to clipboard`))
//     // clipboard.writeSync(shareLink)
//     // await pushTextToLine(shareLink)
//   })
// } catch (err) {
//   errLog(err)
//   throw err
// }
//
// // run before exit
// exitHook(async () => {
//   server.close()
//   // if the tmp link is still alive, rm it
//   // if (isFileExist(symLinkPath)) {
//   //   console.log(`Removing temporary symlink: ${symLinkPath}`)
//   //   await $`rm -rf ${symLinkPath}`
//   // }
// })
