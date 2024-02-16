// const { prompt } = require('enquirer')

// const isUrl = require('is-url')
//
// const response = await prompt({
//   type: 'input',
//   name: 'url',
//   message: 'what url you are to timing',
//   validate: (value: string) => {
//     if (isUrl(value)) {
//       return true
//     } else {
//       return 'Invalid url format'
//     }
//   }
// })
//
// console.log(response.url)

// const { Confirm } = require('enquirer')
//
// const canDeletePrompt = new Confirm({
//   name: 'question',
//   message: 'are you sure to remove all? (PS: file goes into trash can)'
// })
// const canDelete = await canDeletePrompt.run()
// console.log('------->canDelete: ', canDelete)

// const { AutoComplete } = require('enquirer')
//
// const prompt = new AutoComplete({
//   name: 'flavor',
//   message: 'Pick your favorite flavor',
//   limit: 10,
//   initial: 2,
//   choices: [
//     'Almond',
//     'Apple',
//     'Banana',
//     'Blackberry',
//     'Blueberry',
//     'Cherry',
//     'Chocolate',
//     'Cinnamon',
//     'Coconut',
//     'Cranberry',
//     'Grape',
//     'Nougat',
//     'Orange',
//     'Pear',
//     'Pineapple',
//     'Raspberry',
//     'Strawberry',
//     'Vanilla',
//     'Watermelon',
//     'Wintergreen'
//   ]
// })
//
// prompt
//   .run()
//   .then((answer: any) => console.log('Answer:', answer))
//   .catch(console.error)
