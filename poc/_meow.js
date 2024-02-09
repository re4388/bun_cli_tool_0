#!/usr/bin/env node
import meow from 'meow'

function foo(args, flags) {
  console.log('------->flags: ', flags)
  console.log('------->args: ', args)
}

const cli = meow(
  `
	Usage
	  $ foo <input>

	Options
	  --rainbow, -r  Include a rainbow
	  --help, help output you are seeing now
	  --version, output the version number

	Examples
	  $ foo unicorns --rainbow
	  🌈 unicorns 🌈
`,
  {
    importMeta: import.meta,
    flags: {
      rainbow: {
        type: 'boolean',
        shortFlag: 'r'
      }
    },
    description: 'this is desc',
    version: '0.0.1',
    allowUnknownFlags: false,
    inferType: true,
    autoHelp: true
    // help: 'this is help msg'
  }
)
/*
{
	input: ['unicorns'],
	flags: {rainbow: true},
	...
}
*/

// @ts-ignore
foo(cli.input.at(0), cli.flags)

// how to run?
// $ ./_meow.js  unicorns --rainbow
// ------->flags:  { rainbow: true }
// ------->args:  unicorns
