import { $ } from 'zx'
import clipboard from 'clipboardy'
import { z } from 'zod'

const gitRepo = clipboard.readSync()

const validate = z.string().startsWith('https://github.com/', { message: 'Must provide git Repo URL' })

validate.parse(gitRepo)

console.log('run')
// await $`cd /Users/re4388/project/personal/git-clone-pjt && git clone --depth 1 ${gitRepo + '.git'}`
