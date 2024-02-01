import { $, question } from 'zx'
import { z } from 'zod'
import { trim } from 'ramda'

const git_path = trim(await question('enter git clone .git path: '))
const validate = z.string().startsWith('https://github.com/', { message: 'Must provide git Repo URL' }).endsWith('.git')

validate.parse(git_path)
console.log(`git clone depth -1 ${git_path}...`)
await $`cd /Users/re4388/project/personal/git-clone-pjt && git clone --depth 1 ${git_path}`
