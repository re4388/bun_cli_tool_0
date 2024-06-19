import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const enumInHermes = sqliteTable('enumInHermes', {
  id: integer('id').primaryKey(),
  name: text('name'),
  content: text('enum_content')
})

