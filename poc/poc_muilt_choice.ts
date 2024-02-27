const { MultiSelect } = require('enquirer')

function openUrl(url: string) {
  ;`https://github.com/trending/${selected_item}\?since=weekly`
}

const prompt = new MultiSelect({
  name: 'value',
  message: 'Pick your favorite colors',
  limit: 7,
  choices: [
    { name: 'typescript', value: `typescript` },
    { name: 'Python', value: 'Python' },
    { name: 'All', value: 'All' },
    { name: 'shell', value: 'shell' },
    { name: 'javascript', value: 'javascript' },
    { name: 'shell', value: 'shell' },
    { name: 'go', value: 'go' },
    { name: 'c', value: 'c' },
    { name: 'java', value: 'java' }
  ]
})

prompt
  .run()
  .then((answer: any) => console.log('Answer:', answer))
  .catch(console.error)
