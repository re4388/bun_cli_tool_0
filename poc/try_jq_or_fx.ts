import { $, echo, spinner } from 'zx'

await spinner(() => $`long-running command`)
// With a message.
await spinner('working...', () => $`sleep 99`)

// await $`cat /Users/re4388/Downloads/a111.txt | jq keys`
// await $`cat /Users/re4388/Downloads/a111.txt | jq '{ httpVersion, ip, statusCode, url, request}'`

// await $`cat /Users/re4388/Downloads/a111.txt | jq keys`.pipe(process.stdout)

// const greeting = await $`cat /Users/re4388/Downloads/a111.txt`.pipe($`jq keys`)
//
// echo(greeting)

// not work
// await $`cat /Users/re4388/Downloads/a111.txt | fx`
