import find from 'find-process'
import { $ } from 'zx'
import chalk from 'chalk'

// throw new Error('stop')

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
  prettier: {
    displayText: 'prettier',
    keywords: 'prettier'
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
  ts_cli_0: {
    displayText: 'ts_cli_0',
    keywords: 'ts_cli_0'
  },
  node_ver_v21_6_1: {
    displayText: 'v21.6.1',
    keywords: 'v21.6.1'
  },
  node_ver_v12_22_12: {
    displayText: 'v12.22.12(lts-erbium)',
    keywords: 'v12.22.12(lts-erbium)'
  },
  Quokka: {
    displayText: 'Quokka',
    keywords: 'quokka'
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
  const { processInfos: pInfo, lenOfProc } = await getProcInfoV3()
  const processInfos: ProcessInfo[] = pInfo

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

  console.log(chalk.red(`there are ${lenOfProc} node process(es)`))
}

function display(input: { pid: number; cmd: string[] }[], title: string) {
  console.log(chalk.yellow('----------'))
  console.log(chalk.blue(`${title}`))
  console.log(chalk.yellow(`number: ${input.length}`))
  console.log(chalk.yellow('----------'))
  console.log(JSON.stringify(input, null, '\t'))
}

async function getProcInfoV3() {
  const processOutput = await $`pgrep -a node`.quiet()
  const pids = processOutput.stdout.trim().split('\n')
  console.log('------->pids: ', pids)

  let promises = pids.map((pid) => find('pid', pid))
  let res = (await Promise.all(promises)).flat()
  return {
    processInfos: res.map((r) => ({ pid: r.pid, cmd: r.cmd })),
    lenOfProc: res.length
  }
}

// ps -ax -o pid,command | grep '[n]ode'
async function getProcInfoV2() {
  let processInfosTmp: any[] = []
  let listTmp: any = []

  // debug
  // ps -ax -o pid,command | grep '[n]ode' | jc --ps | jq length

  const processOutput =
    await $`ps -ax -o pid,command | grep '[n]ode' | jc --ps > ../data/proc_tmp.json`
  const path = '../data/proc_tmp.json'
  const file = Bun.file(path)
  const contents = await file.json()
  // console.log('------->contents: ', contents)

  // const stdOut = processOutput.stdout
  processInfosTmp = contents.map((c: any) => {
    return {
      pid: parseInt(c['2094']),
      cmd:
        c['/applications/visual'] ||
        '' + c['studio'] ||
        '' + c['code.app/contents/frameworks/cod'] ||
        '' + c['helper.app/contents/macos/code'] ||
        '' + c['helper'] ||
        '' + c['--type=utility'] ||
        '' + c['--enable-sandbox'] ||
        '' + c['--standard-schemes=vscode-webview,vscode-file'] ||
        '' + c['--service-worker-schemes=vscode-webview'] ||
        '' + c['--fetch-schemes=vscode-webview,vscode-file'] ||
        '' + c['--cors-schemes=vscode-webview,vscode-file'] ||
        '' + c['--secure-schemes=vscode-webview,vscode-file'] ||
        '' + c['support/code'] ||
        '' + c['code.app/contents/frameworks/code'] ||
        '' + c['--utility-sub-type=node.mojom.nodeservice'] ||
        '' +
          c[
            '--disable-features=calculatenativewinocclusion,sparerendererforsiteperprocess'
          ] ||
        '' + c['--shared-files'] ||
        '' + c['--user-data-dir=/users/re4388/library/application'] ||
        '' + c['--lang=en-us'] ||
        '' + c['--service-sandbox-type=none'] ||
        ''
    }
  })
  // console.log('------->res: ', res.stdout)
  // console.log('')
  // console.log('')
  // const stdout = res.stdout.split(' ')
  // console.log('------->stdout: ', stdout)
  // await find('name', 'node', true).then(function (list) {
  //   listTmp = list
  //   processInfosTmp = list.map((res) => {
  //     return {
  //       pid: res.pid,
  //       cmd: res.cmd
  //     }
  //   })
  // })

  return { processInfos: processInfosTmp, listlength: contents.length }
}

async function getProcInfo() {
  let processInfosTmp: ProcessInfo[] = []
  let listTmp: {
    pid: number
    ppid?: number | undefined
    uid?: number | undefined
    gid?: number | undefined
    name: string
    cmd: string
  }[] = []
  await find('name', 'node', true).then(function (list) {
    listTmp = list
    processInfosTmp = list.map((res) => {
      return {
        pid: res.pid,
        cmd: res.cmd
      }
    })
  })

  return { processInfos: processInfosTmp, list: listTmp }
}
