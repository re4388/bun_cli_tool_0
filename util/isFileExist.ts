import fs from 'fs'

export function isFileExist(filePath: string): boolean {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}

// test
// const filePath = '/Users/re4388/project/personal/git-clone-pjt/kit/KIT2.md'
// let a1 = isFileExist(filePath)
// console.log('------->a1: ', a1)
