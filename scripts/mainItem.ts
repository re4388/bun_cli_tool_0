import { loadJsonFile } from 'load-json-file'

// import colorize from 'json-colorizer'

const jsonFile = await loadJsonFile(
  '/Users/re4388/project/personal/lang/bun/bun_cli_0/standalone/MaintenanceItem/data.json'
)
console.log('------->jsonFile: ', jsonFile)
