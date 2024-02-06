import chalk from 'chalk'

console.log(`${chalk.bgWhite.bold('hello world')} is copied to clipboard!`)

console.log(
  chalk.bgRed.bold(' Error ') +
    '   ' +
    chalk.bgRedBright(' Short title ') +
    '\n' +
    chalk.red.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.redBright('Description') +
    '\n'
)

console.log(
  chalk.bgYellow.bold(' Warning ') +
    '   ' +
    chalk.bgYellowBright(' Short title ') +
    '\n' +
    chalk.yellow.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.yellowBright('Description') +
    '\n'
)

console.log(
  chalk.bgGreen.bold(' Success ') +
    '   ' +
    chalk.bgGreenBright(' Short title ') +
    '\n' +
    chalk.green.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.greenBright('Description') +
    '\n'
)

console.log(
  chalk.bgBlue.bold(' Info ') +
    '   ' +
    chalk.bgBlueBright(' Short title ') +
    '\n' +
    chalk.blue.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.blueBright('Description') +
    '\n'
)

console.log(
  chalk.bgCyan.bold(' Info ') +
    '   ' +
    chalk.bgCyanBright(' Short title ') +
    '\n' +
    chalk.cyan.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.cyanBright('Description') +
    '\n'
)

console.log(
  chalk.bgMagenta.bold(' Info ') +
    '   ' +
    chalk.bgMagentaBright(' Short title ') +
    '\n' +
    chalk.magenta.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.magentaBright('Description') +
    '\n'
)

console.log(
  chalk.bgWhite.bold(' Info ') +
    '   ' +
    chalk.bgWhiteBright(' Short title ') +
    '\n' +
    chalk.white.bold('Long title. More than 2 words.') +
    '\n' +
    chalk.whiteBright('Description') +
    '\n'
)
