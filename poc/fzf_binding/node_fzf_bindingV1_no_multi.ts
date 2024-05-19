import { spawn } from 'node:child_process'

export async function fzf(selections: string[], options?: []): Promise<string> {
  /**
   * 用 spawn() 方法创建一个新的子进程，该子进程将执行 fzf 命令。
   * 通过 stdio 选项，我们将子进程的标准输入和输出连接到当前进程的标准输入和输出。
   * 这样，我们就可以将选择项写入 fzf 的标准输入，并从 fzf 的标准输出读取用户的选择。
   *
   */
  const fzf = spawn('fzf', [...(options || '')], {
    stdio: ['pipe', 'pipe', 'inherit']
  })
  // 我们将选择项写入 fzf 的标准输入。
  // 为此，我们将选择项连接到一个字符串，并将其写入 fzf 的标准输入。
  fzf.stdout.setEncoding('utf8')

  // 這裡是把選項寫入 fzf 的 stdin
  fzf.stdin.write(selections.join('\n'))
  // 這裡是告訴 fzf stdin 結束了
  fzf.stdin.end()

  // 最后，我们返回一个 Promise，该 Promise 在用户选择后解析为用户的选择。
  // 为了实现这一点，我们监听 fzf 的标准输出，并在其上发出 data 事件时解析用户的选择。
  // 由于 fzf 的标准输出是一个 Readable 流，我们可以将其转换为 Promise，以便在用户选择后解析为用户的选择。
  return new Promise((resolve, _reject) => {
    fzf.stdout.on('data', (selection: string) => {
      resolve(selection.trim())
    })
  }) as unknown as string
}

/**
 * fzf 是一個 UI
 * 吃 用\n 分隔的一個 string
 * 用列表顯示在上面
 * 當你key in, 會 fuzz search 上面的選項，列出來
 * 當你選好按下 enter 後
 * 會 stdout 選好的
 */
