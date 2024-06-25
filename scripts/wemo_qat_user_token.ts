import clipboard from 'clipboardy'
import jwt from 'jsonwebtoken'

const qatUserId = process.env.qatUserId as string
const qatSecret = process.env.qatSecret as string

const qatTokenUserApp = jwt.sign(
  {
    userId: qatUserId,
    user_id: qatUserId,
    iat: new Date().getTime(),
    exp: new Date().getTime() + 48 * 60 * 60 * 1000
  },
  qatSecret,
  {}
)

clipboard.writeSync(`WeMo ${qatTokenUserApp}`)
console.log('copied to clipboard!')
