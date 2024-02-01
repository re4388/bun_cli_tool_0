import ngrok from 'ngrok'
import http from 'http'
import url from 'url'
import { pushTextToLine } from '../util/pusgToLine'

const port = 3033
// TODO: check if the port is being used...

let httpServer = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url as string, true)
  const query = parsedUrl.query

  const message = query.msg || 'No message provided'

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  console.log('------->message: ', message)
  res.end(`Received`)
})

httpServer.listen(port, async () => {
  console.log(`server listening...`)
  let tunnel = await ngrok.connect(port)
  const msg = tunnel + '?msg=hello_world'
  await pushTextToLine(msg)
})
