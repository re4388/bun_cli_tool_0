import lunr from 'lunr'

const documents = [
  {
    name: 'Lunr',
    text: 'Like Solr, but much smaller, and not as bright.'
  },
  {
    name: 'React',
    text: 'A JavaScript library for building user interfaces.'
  },
  {
    name: 'Lodash',
    text: 'A modern JavaScript utility library delivering modularity, performance & extras.'
  }
]

// We will use the above array of documents to build our index.
// We want to search the text field,
// and the name will be our identifier.
// Let’s define our index and add these documents to it.
const idx = lunr(function () {
  this.ref('name')
  this.field('text')

  documents.forEach((doc) => {
    this.add(doc)
  }, this)
})

let res = idx.search('building')
console.log('------->res: ', res)
