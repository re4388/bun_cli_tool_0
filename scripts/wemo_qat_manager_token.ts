import clipboard from 'clipboardy'
import jwt from 'jsonwebtoken'

const qatUserIdApollo = process.env.qatUserIdApollo as string
const qatSecretApollo = process.env.qatSecretApollo as string

const iat = new Date().getTime()
const expireAfterTwoDay = iat + 48 * 60 * 60 * 1000

const qatTokenUserApp = jwt.sign(
  {
    userId: qatUserIdApollo,
    user_id: qatUserIdApollo,
    iat,
    exp: expireAfterTwoDay
  },
  qatSecretApollo,
  {}
)

clipboard.writeSync(`Manager ${qatTokenUserApp}`)
console.log('copied to clipboard!')
