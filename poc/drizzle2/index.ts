import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);
const result = await db.select().from(users);
