import * as crypto from 'crypto'

function generateMD5Hash(data: string): string {
  const hash = crypto.createHash('md5')
  hash.update(data)
  return hash.digest('hex')
}

const data = 'Hello, World!'
const md5Hash = generateMD5Hash(data)
console.log('MD5 Hash:', md5Hash)
