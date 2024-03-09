var Docker = require('dockerode')
// create a container entity. does not query API
var container = Docker.getContainer('7810bf9ae723')

// query API for container info
container.inspect(function (err: any, data: any) {
  console.log(data)
})
