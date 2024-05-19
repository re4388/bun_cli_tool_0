import { loadJsonFile } from 'load-json-file'
// @ts-ignore
import jsome from 'jsome'
jsome.colors = {
  num: 'cyan', // stands for numbers
  // str: 'magenta', // stands for strings
  str: 'blue', // stands for strings
  bool: 'red', // stands for booleans
  // regex: 'blue', // stands for regular expressions
  undef: 'grey', // stands for undefined
  null: 'grey', // stands for null
  attr: 'green', // objects attributes -> { attr : value }
  quot: 'yellow', // strings quotes -> "..."
  punc: 'yellow', // commas seperating arrays and objects values -> [ , , , ]
  brack: 'yellow' // for both {} and []
}

// import colorize from 'json-colorizer'

const jsonFile = await loadJsonFile(
  '/Users/re4388/project/personal/nodets/ts_cli_0/data/timing.json'
)

if (!jsonFile) {
  throw new Error()
}
jsome(jsonFile)

var obj = {
  install: false,
  devpackages: ['colorz', 'json-colorz'],
  packages: [1, 2, 3],
  git: false,
  verbose: /(app)/,
  dryrun: true,
  files: {
    gitignore: false,
    eslintrc: true,
    index: true,
    license: false,
    package: true,
    readme: true,
    test: false,
    travis: false
  },
  meta: {
    date: 'Mon Oct 19 2015 16:48:33 GMT-0400 (EDT)',
    year: '2015',
    packageName: 'testproj607',
    type: 'private',
    repo: 'none',
    remote: false,
    push: false,
    author: 'Your Name',
    email: 'git@your.email',
    name: 'yourHandle',
    url: 'https://github.com/yourHandle/testproj607',
    version: '0.1.0',
    license: 'ISC',
    description: 'An awesome module being created'
  }
}
jsome(obj)
