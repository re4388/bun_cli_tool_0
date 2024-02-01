import clipboard from 'clipboardy'
import jwt from 'jsonwebtoken'

const qatUserId = process.env.qatUserId as string
const qatSecret = process.env.qatSecret as string

const iat = new Date().getTime()
const expireAfterTwoDay = iat + 48 * 60 * 60 * 1000

const qatTokenUserApp = jwt.sign(
  {
    userId: qatUserId,
    user_id: qatUserId,
    iat,
    exp: expireAfterTwoDay
  },
  qatSecret,
  {}
)

clipboard.writeSync(`WeMo ${qatTokenUserApp}`)
console.log('copied to clipboard!')

