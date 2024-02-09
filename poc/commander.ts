// const { program } = require('commander')
//
// program.option('--first').option('-s, --separator <char>')
//
// program.parse()
//
// const options = program.opts()
// const limit = options.first ? 1 : undefined
// console.log('------->program.args: ', program.args)
// console.log(program.args[0].split(options.separator, limit))

const { Command } = require('commander')
const program = new Command()

program.name('string-util').description('CLI to some JavaScript string utilities').version('0.8.0')

program
  .command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str: string, options: { first: any; separator: any }) => {
    const limit = options.first ? 1 : undefined
    console.log(str.split(options.separator, limit))
  })

program.parse()
