process.on('message', (message) => {
  // print message from parent
  console.log('------->message: ', message)
})

// @ts-ignore
process.send('Hello from child as string')
// @ts-ignore
process.send({ message: 'Hello from child as object' })
