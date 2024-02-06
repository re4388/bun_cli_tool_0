// [The Bun Shell | Bun Blog](https://bun.sh/blog/the-bun-shell)
// https://bun.sh/docs/runtime/shell

// import { $ } from 'bun'
// const response = await fetch('https://example.com')
// console.log('------->response: ', response)
// // // Use Response as stdin.
// await $`echo < ${response} > wc -c` // 120  -> 失敗 XD

// import { $ } from 'bun'
// const result = await $`echo "Hello World!" | wc -w`.text()
// console.log(result) // 2\n

// import { $ } from "bun";
// const foo = "bar123";
// await $`FOO=${foo + "456"} bun -e 'console.log(process.env.FOO)'`; // bar123456\n

// cwd, change working directory
// import { $ } from 'bun'
// await $`pwd`.cwd('/tmp') // /tmp

// import { $ } from 'bun'
// const result = await $`echo '{"foo": "bar"}'`.json()
// console.log(result) // { foo: "bar" }

// import { $ } from 'bun'
// const res = await $`cat bun_cli.ts`.text()
// console.log('------->res: ', res)

// import { $ } from 'bun'
// const search = 'bun'
// for await (let line of $`cat bun_cli.ts | grep ${search}`.lines()) {
//   console.log(line)
// }

// import { $ } from 'bun'
// const res = await $.braces(`echo {1,2,3}`)
// console.log('------->res: ', res)
// => ["echo 1", "echo 2", "echo 3"]
