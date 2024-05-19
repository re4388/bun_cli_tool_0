import { db } from './db'
import * as schema from './schema.ts'

await db.insert(schema.enumInHermes).values([
  {
    name: '1',
    content: '123'
  },
  {
    name: '2',
    content: '1233'
  }
])

console.log(`Seeding complete.`)
