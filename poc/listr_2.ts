import Listr from 'listr'
const tasks = new Listr([
  {
    title: 'Success',
    task: () => 'Foo'
  },
  {
    title: 'Failure',
    task: () => {
      throw new Error('Bar')
    }
  }
])

tasks.run().catch((err) => {
  console.error(err)
})
