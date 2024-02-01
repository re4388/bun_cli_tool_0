const { LineClient } = require('messaging-api-line')

export async function pushTextToLine(text) {
  const userId = `
U7ee61bf4d1721b77976b3f8ac38b3ff7`
  const token = `s19Xzrw8j71uvdzTbFRxTyWHotTOS8AV+VPNDzMGi6nI/uRRrHO5giqGDQBH7AFUsu81rAilC+anC0tZpHeo/oLc819o8I4JIX6XQniJPHSKo+5cgoJOUl7jTHxviMHWV733BXr9T2Js2YkcnPzbTgdB04t89/1O/w1cDnyilFU=`
  const secret = `17fcbf83f049ae1a15b387a978d27ce3`

  const client = new LineClient({
    accessToken: token,
    channelSecret: secret
  })

  client.pushText(userId, text).then(() => {
    console.log('pushed')
  })
}
