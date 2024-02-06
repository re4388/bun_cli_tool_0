const readline = require('readline')
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'q') {
    console.log('bye bye')
    process.exit()
  }
})

// const readline = require('readline')
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
//
// // Listen for the 'line' event
// rl.on('line', (input: string) => {
//   // Check if the input is 'q' and exit the program
//   if (input.toLowerCase() === 'q') {
//     console.log('Exiting the program...')
//     rl.close()
//     process.exit()
//   }
// })
