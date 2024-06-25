import { readFileSync } from 'fs'
import { spawn } from 'node:child_process'

// bun /Users/re4388/project/personal/lang/bun/bun_cli_0/poc/m3u8_dl/run.ts vox_machina_s1

const prefix = process.argv.slice(2) // 獲取命令行參數，去掉前面兩個默認參數
if (prefix.length === 0) {
  console.log('請輸入一個字串作為前綴')
  process.exit(1)
}

const input = readFileSync(
  '/Users/re4388/project/personal/lang/bun/bun_cli_0/poc/m3u8_dl/input.txt',
  'utf-8'
)
// console.log(input)

let lines = input.split('\n')
lines = lines.filter((line) => line.length > 0)

const allUrlPaths: string[] = []
const downloadUrl: string[] = []
const fileName: string[] = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]

  // check if the line is a number
  const num = Number(line)
  if (!isNaN(num)) {
    fileName.push(`${prefix}_${num}`)
  }

  // check if the line is a URL
  const url = line.trim()
  if (url.startsWith('http')) {
    downloadUrl.push(url)
  }

  if (downloadUrl.length === 1 && fileName.length === 1) {
    allUrlPaths.push(
      `ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i ${url} -c copy ${fileName}.mp4`
    )
    downloadUrl.pop()
    fileName.pop()

    if (downloadUrl.length > 0 || fileName.length > 0) {
      throw Error('shall pop and back to zero length')
    }
  }
}

console.log('allUrlPaths -->', allUrlPaths)

async function runCommands(commands: string[]) {
  const processes = commands.map((command) => {
    const [cmd, ...args] = command.split(' ')
    return spawn(cmd, args)
  })

  for (const process of processes) {
    process.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`)
    })

    process.on('exit', (code) => {
      console.log(`Process exited with code ${code}`)
    })
  }

  //@ts-ignore
  await Promise.all(processes.map((p) => p.exited))
}

function main() {
  //   const commands = ['echo a2', 'date +%s', 'fd _zx.ts']
  runCommands(allUrlPaths).catch((error) => {
    console.error(`Error: ${error.message}`)
  })
}

main()
