import boxen from 'boxen'

// console.log(boxen('unicorn', { padding: 1 }))
/*
┌─────────────┐
│             │
│   unicorn   │
│             │
└─────────────┘
*/

// console.log(boxen('IntelliJ Plugin', { padding: 1, margin: 1, borderStyle: 'double' }))
/*

   ╔═════════════╗
   ║             ║
   ║   unicorn   ║
   ║             ║
   ╚═════════════╝

*/

// const content = 'apple banana\n fish \n'
const content = {
  apple: 3,
  banana: 2,
  fish: 1,
  apple2: 2,
  fish2: 1,
  apple3: 3,
  banana2: 2,
  fish3: 1,
  apple4: 3,
  banana44: 2,
  fish444: 1
}

console.log(boxen(JSON.stringify(content), { title: 'IntelliJ Plugin', titleAlignment: 'center' }))
/*
┌────── magical ───────┐
│unicorns love rainbows│
└──────────────────────┘
*/
