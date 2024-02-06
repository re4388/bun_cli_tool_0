var Table = require('cli-table3')
var table = new Table()

table.push(
  { pid: '90397' },
  {
    cmd:
      '\t"/Users/re4388/Library/Application",\n' +
      '\t\t\t"Support/fnm/node-versions/v18.12.1/installation/bin/node",\n' +
      '\t\t\t"/Users/re4388/project/personal/lang/bun/bun_cli_0/node_modules/typescript/lib/typingsInstallers.js",\n' +
      '\t\t\t"--globalTypingsCacheLocation",\n' +
      '\t\t\t"/Users/re4388/Library/Caches/typescript/5.3",\n' +
      '\t\t\t"--typesMapLocation",\n' +
      '\t\t\t"/Users/re4388/project/personal/lang/bun/bun_cli_0/node_modules/typescript/lib/typesMap.json"'
  }
)

console.log(table.toString())
