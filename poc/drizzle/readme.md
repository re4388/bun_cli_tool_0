# We can use the drizzle-kit CLI to generate an generated SQL migration.

```shell
bunx drizzle-kit generate:sqlite --schema ./schema.ts
```

then you use migrate.ts to run generated migration
```shell
bun run migrate.ts
```

then you can seed some data
```shell
bun run seed.ts
```
