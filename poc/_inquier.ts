// import editor from '@inquirer/editor'
//
// const answer = await editor({
//   message: 'Enter a description',
//   default: 'xxxxxxxxxxxxxxxxxxx'
// })

import inquirer from 'inquirer'

inquirer
  .prompt([
    {
      type: 'editor',
      name: 'story',
      message: 'Tell me a story, a really long one!'
    }
  ])
  .then((answers: { story: any }) => {
    console.info('Answer:', answers.story)
  })
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
