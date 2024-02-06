const childProc = Bun.spawn(['bun', './child.ts'], {
  ipc(message, childProc) {
    /**
     * The message received from the sub process
     **/
    console.log('------->message: ', message)
    childProc.send('Respond to child')
  }
})

childProc.send('I am your father') // The parent can send messages to the child as well
