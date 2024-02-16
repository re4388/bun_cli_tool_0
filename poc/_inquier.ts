import checkbox, { Separator } from '@inquirer/checkbox'

const answer = await checkbox({
  message: 'Select a package manager',
  choices: [
    { name: 'npm', value: 'npm' },
    { name: 'yarn', value: 'yarn' },
    new Separator(),
    { name: 'pnpm', value: 'pnpm', disabled: true },
    {
      name: 'pnpm',
      value: 'pnpm',
      disabled: '(pnpm is not available)'
    }
  ]
})

//
// import { edit } from 'external-editor'
// const data = edit('\n\n# Please write your text above')
// console.log(data)

// import editor from '@inquirer/editor'
//
// const answer = await editor({
//   message: 'Enter a description',
//   default: 'xxxxxxxxxxxxxxxxxxx'
// })

import inquirer from 'inquirer'

// inquirer
//   .prompt([
//     {
//       type: 'editor',
//       name: 'story',
//       message: 'Tell me a story, a really long one!'
//     }
//   ])
//   .then((answers: { story: any }) => {
//     console.info('Answer:', answers.story)
//   })
// import input from '@inquirer/input'
//
// const answer = await input({
//   message: 'Enter your name',
//   theme: {
//     prefix: 'XX',
//     style: {
//       defaultAnswer: () => 'QQQQQQQQ'
//     }
//   }
// })
// console.log('------->answer: ', answer)
