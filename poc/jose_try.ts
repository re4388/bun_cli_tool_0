import * as jose from 'jose'

const qatUserIdApollo = process.env.qatUserIdApollo as string
const qatSecretApollo = process.env.qatSecretApollo as string
const iat = new Date().getTime()
const expireAfterTwoDay = iat + 48 * 60 * 60 * 1000
const secret = new TextEncoder().encode(qatSecretApollo)
const alg = 'HS256'

const payload = {
  userId: qatUserIdApollo,
  user_id: qatUserIdApollo,
  iat,
  exp: expireAfterTwoDay
}

const jwt = await new jose.SignJWT(payload)
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .sign(secret)

console.log(jwt)

// export qatUserIdApollo="352"
// export qatSecretApollo="WeMoQAT!"
// export qatUserId="201212"
// export qatSecret="WeMoQAT!"

// import clipboard from 'clipboardy'
// import jwt from 'jsonwebtoken'
//
// const qatUserIdApollo = process.env.qatUserIdApollo as string
// const qatSecretApollo = process.env.qatSecretApollo as string
//
// const iat = new Date().getTime()
// const expireAfterTwoDay = iat + 48 * 60 * 60 * 1000
//
// const qatTokenUserApp = jwt.sign(
//   {
//     userId: qatUserIdApollo,
//     user_id: qatUserIdApollo,
//     iat,
//     exp: expireAfterTwoDay
//   },
//   qatSecretApollo,
//   {}
// )
//
// clipboard.writeSync(`Manager ${qatTokenUserApp}`)
// console.log('copied to clipboard!')
