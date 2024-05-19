import * as schema from './schema.ts'
import { fzf } from 'fzf-bun'
import { db } from './db'
import { eq } from 'drizzle-orm'

const enumTable = schema.enumInHermes

const result = await db.select().from(enumTable)
// console.log(result)

const enumNameSelections = result.map((resultElement) => resultElement.name!)

// Run `man fzf` in your shell to see all available fzf options
const fzfOptions = ['--reverse', '--multi', '--preview-window=right']

const selection = await fzf(enumNameSelections, fzfOptions)
// console.log('------->selection: ', selection)

// [Drizzle ORM - Query](https://orm.drizzle.team/docs/rqb)
const content = await db.select().from(enumTable).where(eq(enumTable.name, selection))
console.log(content[0].content)
