import { $ } from 'zx'

const allProjects =
  await $`ls /Users/re4388/project/personal/lang/bun/bun_cli_0/data/reminder`

allProjects.stdout.trim().split('\n')
