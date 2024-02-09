const { LineClient } = require('messaging-api-line')

export async function pushTextToLine(text) {
  const userId = process.env.LINE_USERID
  const accessToken = process.env.LINE_TOKEN
  const channelSecret = process.env.LINE_SECRET

  const client = new LineClient({ accessToken, channelSecret })

  // https://github.com/bottenderjs/messaging-apis/blob/master/packages/messaging-api-line/README.md#pushvideouserid-video-options---official-docs
  client.pushText(userId, text).then(() => {
    console.log('pushed')
  })
}
