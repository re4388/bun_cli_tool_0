import find from 'find-process'
import chalk from 'chalk'
// import boxen from 'boxen'
var figlet = require('figlet')

console.log(
  figlet.textSync('Boo!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  })
)

// const mdContent = `
// ## macro 用法
// - 啟動: \`qa\`
// - 停止: \`q\`
// - 在 ex mode 上使用 -> \`:12,31 norm @a\`
//
// ## dot 用法
// - use visual mode to select first:
// - \`:'<, '> norm . \`
//
// # replace 用法
// - \`:%s /old/new/g\`
// - \`:%s /old/new/gc  (c means confirm)\`
// `
//
// console.log(cliMd(mdContent));

const TAGS = {
  vscode_ext: {
    displayText: 'Vscode extension',
    keywords: 'vscode/extensions'
  },
  fnm: {
    displayText: 'fnm shells',
    keywords: 'fnm_multishells'
  },
  vscode: {
    displayText: 'VSCode',
    keywords: 'Visual Studio Code.app'
  },
  intelliJ: {
    displayText: 'IntelliJ IDEA',
    keywords: 'IntelliJ IDEA.app'
  },
  ts_play_ground_0: {
    displayText: 'ts playground 0',
    keywords: 'ts-playground-0'
  },
  project_work: {
    displayText: 'project in work',
    keywords: 're4388/project/work'
  },
  project_personal: {
    displayText: 'project in personal',
    keywords: 're4388/project/personal'
  },
  bun_cli_0: {
    displayText: 'bun_cli_0',
    keywords: 'bun_cli_0'
  },
  git_clone_pjt: {
    displayText: 'git-clone-pjt',
    keywords: 'git-clone-pjt'
  },
  intelliJ_plugIn: {
    displayText: 'IntelliJ Plugin',
    keywords: 'IntelliJ IDEA.app/Contents/plugins'
  },
  node_ver_v18_12_1: {
    displayText: 'v18.12.1',
    keywords: 'v18.12.1'
  },
  node_ver_v12_22_12: {
    displayText: 'v12.22.12(lts-erbium)',
    keywords: 'v12.22.12(lts-erbium)'
  }
}

interface ProcessInfo {
  pid: number
  cmd: string
  tag?: string[]
}

await main()

function mutateProcInfosByAddTag(processInfos: ProcessInfo[]) {
  processInfos.forEach((procInfo) => {
    const tags = Object.values(TAGS).map((v) => v.keywords)

    for (const tag of tags) {
      const res = procInfo.cmd.includes(tag)
      if (res === true) {
        if (procInfo.tag === undefined) {
          procInfo.tag = []
        }
        procInfo.tag.push(tag)
      }
    }
  })

  return processInfos
}

async function main() {
  let processInfos: ProcessInfo[] | undefined
  await find('name', 'node', true).then(function (list) {
    console.log(chalk.red(`there are ${list.length} node process(es)`))

    processInfos = list.map((res) => {
      return {
        pid: res.pid,
        cmd: res.cmd
      }
    })
  })

  if (processInfos === undefined) {
    console.log('no node process found')
    return
  }

  mutateProcInfosByAddTag(processInfos)

  // maintain a selected list so we can use this list to filter the other pid
  let selected: number[] = []

  // display vscode extension
  const procVscodeExt = processInfos
    .filter((pInfo) => pInfo.tag?.includes(TAGS.vscode_ext.keywords))
    .map((pInfo) => {
      return {
        pid: pInfo.pid,
        cmd: pInfo.cmd.split(' '),
        tag: pInfo.tag
      }
    })
  display(procVscodeExt, TAGS.vscode_ext.displayText)
  procVscodeExt.forEach((p) => selected.push(p.pid))

  // display the intelliJ IDEA plugin
  const procIntelliJPlugin = processInfos
    .filter((pInfo) => pInfo.tag?.includes(TAGS.intelliJ_plugIn.keywords))
    .map((pInfo) => {
      return {
        pid: pInfo.pid,
        cmd: pInfo.cmd.split(' '),
        tag: pInfo.tag
      }
    })
  display(procIntelliJPlugin, TAGS.intelliJ_plugIn.displayText)
  procIntelliJPlugin.forEach((p) => selected.push(p.pid))

  // display other
  const other = processInfos
    .filter((p) => !selected.includes(p.pid))
    .map((pInfo) => {
      return {
        pid: pInfo.pid,
        cmd: pInfo.cmd.split(' '),
        tag: pInfo.tag
      }
    })
  display(other, 'other')
}

function display(input: { pid: number; cmd: string[] }[], title: string) {
  console.log(chalk.yellow('----------'))
  console.log(chalk.blue(`${title}`))
  console.log(chalk.yellow(`number: ${input.length}`))
  console.log(chalk.yellow('----------'))
  console.log(JSON.stringify(input, null, '\t'))
}
