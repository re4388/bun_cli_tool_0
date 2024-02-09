import envPaths from 'env-paths'

const paths = envPaths('MyApp')

paths.data
console.log('------->paths.data: ', paths.data)
//=> '/home/sindresorhus/.local/share/MyApp-nodejs'

paths.config
console.log('------->paths.config: ', paths.config)
//=> '/home/sindresorhus/.config/MyApp-nodejs'

// my os result:
// ------->paths.data:  /Users/re4388/Library/Application Support/MyApp-nodejs
// ------->paths.config:  /Users/re4388/Library/Preferences/MyApp-nodejs
