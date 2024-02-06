import select from '@inquirer/select'
import { input } from '@inquirer/prompts'
import open from 'open'

const searchPlace = await select({
  message: 'Select...',
  choices: [
    {
      name: 'HackerNews',
      value: 'HackerNews',
      description: 'search in HackerNews'
    },
    {
      name: 'stackoverflow',
      value: 'stackoverflow',
      description: 'only search in stackoverflow'
    },
    {
      name: 'find awesome',
      value: 'find awesome',
      description: 'find awesome repo in github'
    }
    // {
    //   name: 'show size',
    //   value: 'show size',
    //   description: 'show size for remote repo'
    // }
  ]
})

switch (searchPlace) {
  case 'HackerNews': {
    const query = await input({ message: 'Enter query' })
    await open(`https://hn.algolia.com/?dateRange=all&page=0&prefix=false&query=${query}&sort=byPopularity&type=story`)
    break
  }
  case 'stackoverflow': {
    const query = await input({ message: 'Enter query' })
    await open(`https://www.google.com/search?q=${query}+site%3Astackoverflow.com`)
    break
  }
  case 'find awesome': {
    const query = await input({ message: 'Enter query' })
    await open(`https://www.google.com/search?q=${query}+awesome+github`)
    break
  }

  // const txt = `https://www.google.com/search?q=nodejs+cli+awesome+github`

  default: {
    console.log('no this option')
  }
}
