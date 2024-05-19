import lunr from 'lunr'

// 有兩個可以搜尋的欄位： title 和 body ，以及一個可以用作識別符的 id 欄位
const documents = [
  {
    id: 'http://my.blog/post1',
    title: 'job',
    body: 'We will use the above array of documents to build our index'
  },
  {
    id: 'http://my.blog/post2',
    title: 'banana',
    body: 'We want to search the text field'
  },
  {
    id: 'http://my.blog/post3',
    title: 'apple',
    body: 's define our index and add these documents to it.'
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
