export async function fzf(selections: string[], options?: []): Promise<string> {
  /**
   * 用 Bun.spawn() 方法创建一个新的子进程，该子进程将执行 fzf 命令。
   * 该方法返回一个 ChildProcess 对象，该对象具有 stdin 和 stdout 属性。
   * stdin 属性是一个 WritableStream 对象，用于向子进程的标准输入流写入数据。
   * stdout 属性是一个 ReadableStream 对象，用于从子进程的标准输出流读取数据。
   *
   * 该方法接受一个数组作为第一个参数，该数组包含要执行的命令及其参数。
   * 第二个参数是一个对象，用于指定子进程的标准输入流和标准输出流的类型。
   * 该对象的 stdin 属性是一个字符串，用于指定子进程的标准输入流的类型。
   * 该对象的 stdout 属性是一个字符串，用于指定子进程的标准输出流的类型。
   *
   */
  const fzf = Bun.spawn(['fzf', ...(options || [])], {
    stdin: 'pipe',
    stdout: 'pipe'
  })

  // 将选择列表写入 fzf 的stdin
  // fzf 的 std 接收的是 string, 用 \n 切成不同的 selection
  fzf.stdin!.write(selections.join('\n'))
  // 关闭 fzf 的stdin
  fzf.stdin!.end()

  // 读取 fzf 的stdout, 返回一个 Promise 对象
  const selection = await new Response(fzf.stdout).text()
  // 返回选择的结果
  return selection.trim()
}

/**
 * fzf 是一個 UI
 * 吃 用\n 分隔的一個 string
 * 用列表顯示在上面
 * 當你key in, 會 fuzz search 上面的選項，列出來
 * 當你選好按下 enter 後
 * 會 stdout 選好的
 */
