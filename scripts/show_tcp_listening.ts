
import { $ } from 'zx'
await $`lsof -iTCP -sTCP:LISTEN | awk  '{print $1, $2,$9}' | fzf`


/**
 *
 * walkaround:
 *
 * use bun to call up zx
 *
 * for xxxx reason we can't use zx to call zx (from cli to nodejs programs)
 * but we can use bun to call zx
 *
 *
 *
 *
 *
 */



// import { $ } from "bun";
// await $`lsof -iTCP -sTCP:LISTEN | awk  '{print $1, $2,$9}' | peco`

