import { execa } from 'execa'
import { $ } from 'execa'
;(async () => {
  const { stdout } = await execa('ls')
  console.log(stdout)
})()

//////

// ;(async () => {
//   const { stdout } = await execa('ls', ['-lh', '/Users/re4388/project/personal/git-clone-pjt'])
//   console.log(stdout)
// })()
// ;(async () => {
//   const { stdout } = await execa('ls', ['-lh', '/InvalidPath'], {
//     stderr: 'stdout'
//   })
//   console.log(stdout)
// })()

// const args = ['unicorns', '&', 'rainbows!']
// const { stdout } = await $`echo ${args}`
// console.log(stdout)
