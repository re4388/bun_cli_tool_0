import { errLog } from './errorLog.ts'

const fs = require('fs')

export function ln(param: { realPath: string; linkPath: string }) {
  const { realPath, linkPath } = param
  // const targetPath = 'path/to/target/file.txt'; // Replace with your target file
  // const linkPath = 'path/to/symlink/file-link.txt'; // Replace with the desired symlink path

  try {
    console.log('------->linkPath: ', linkPath)
    console.log('------->realPath: ', realPath)
    fs.symlinkSync(realPath, linkPath, 'file')
  } catch (err) {
    errLog(err)
  }
}
