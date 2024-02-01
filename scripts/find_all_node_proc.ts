import find from 'find-process'
import * as R from 'ramda'

find('name', 'node', true).then(function (list) {
  console.log('there are %s node process(es)', list.length)
  console.log(
    '------->list: ',
    list.map((res) => {
      return {
        pid: res.pid,
        cmd: res.cmd
      }
    })
  )
})
