import { $ } from 'bun'

const query = 'spawn'

// const { stdout, stderr, exitCode } = await $`rg ${query}`.quiet()
// console.log('------->stdout: ', stdout)
// console.log('------->stderr: ', stderr)
// console.log('------->stdout: ', stdout)
// 然後，後面你要會知道如何處理 buffer, toString() 就直接變成 string

// let str = stdout.toString()
// console.log('------->str: ', str)

// let j1 = await $`rg ${query}`.json()
// console.log('------->j1: ', j1)
// SyntaxError: JSON Parse error: Unexpected identifier "package"
// 本身要是一個 json 格式的 string 才行

//
for await (let line of $`rg ${query}`.lines()) {
  console.log(line) // Hello World!
}
