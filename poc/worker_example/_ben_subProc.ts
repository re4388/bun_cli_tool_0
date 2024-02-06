// const proc = Bun.spawn(['echo', 'hello'], {
//   cwd: '.', // specify a working directory
//   env: { ...process.env, FOO: 'bar' }, // specify environment variables
//   onExit(proc, exitCode, signalCode, error) {
//     // exit handler
//     console.log('------->error: ', error)
//     console.log('------->signalCode: ', signalCode)
//     console.log('------->exitCode: ', exitCode)
//     console.log('------->proc: ', proc)
//   }
// })
//
// console.log('------->proc.pid: ', proc.pid)
////////////////////////////////////////////////////////////////////////
// const proc = Bun.spawn(['cat'], {
//   stdin: await fetch('https://raw.githubusercontent.com/oven-sh/bun/main/examples/hashing.js')
// })
// const text = await new Response(proc.stdout).text()
// console.log(text) // "const input = "hello world".repeat(400); ..."
////////////////////////////////////////////////////////////////////////
