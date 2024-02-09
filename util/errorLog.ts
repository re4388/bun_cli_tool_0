const ErrorLog = require('pretty-error')

const pe = new ErrorLog()

export function errLog(err: any) {
  console.log(pe.render(err))
}
