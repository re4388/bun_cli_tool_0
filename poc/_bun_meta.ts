import.meta.dir // => "/path/to/project"
import.meta.file // => "file.ts"
import.meta.path // => "/path/to/project/file.ts"

import.meta.main // `true` if this file is directly executed by `bun run`
// `false` otherwise

import.meta.resolveSync('zod')
// resolve an import specifier relative to the directory

// console.log('----------------------------------------------------------------')
// console.log(import.meta.dir)
// console.log(import.meta.file)
// console.log(import.meta.path)
// console.log(import.meta.main)
// console.log(import.meta.resolveSync('zod'))
