import { Table } from 'voici.js'

const data = [
  { firstname: 'Homer', lastname: 'Simpsoddddddddddn', age: 39 },
  { firstname: 'Marge', lastname: 'Simpson', age: 36 },
  { firstname: 'Bart', lastname: 'Simpson', age: 10 },
  { firstname: 'Lisa', lastname: 'Simpson', age: 8 },
  { firstname: 'Maggie', lastname: 'Simpson', age: 1 }
]

// const config = {
//   header: {
//     bgColor: '#6184D8',
//     textColor: '#d8b561'
//   }
// }

// const table = new Table(data, config)
const table = new Table(data)
table.print()
