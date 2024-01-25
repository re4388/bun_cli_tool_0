import cliMd from "cli-markdown";

const mdContent = `
## macro 用法
- 啟動: \`qa\`
- 停止: \`q\`
- 在 ex mode 上使用 -> \`:12,31 norm @a\`

## dot 用法
- use visual mode to select first:
- \`:'<, '> norm . \`

# replace 用法
- \`:%s /old/new/g\`
- \`:%s /old/new/gc  (c means confirm)\`
`

console.log(cliMd(mdContent));


const mdBk = `

    

# 下次如果無法save因為權限問題, try this:
- :w !sudo tee %

## 大小寫
- 單一個 char:   ~
- Verb (gu or gU) + 單位



## 把某個 col 加起來，下面是第一個 col
:%!awk -F '|' '{print; sum+=$4}; END {print "Total: "sum}'


# mark 用法
- go to last change pos -> \`.\`
- go to last edit pos -> \`"\`
- 你跳去一個地方，這個可以讓你回到你跳前的地方 -> backtick


## 貼上東西到系統的 register
- "*y

## ter mode 下 切到 normal mode
- 用點的最快
- "Ctrl+ \ followed by Ctrl + n


# change inside b/B (cib or ciB)
- b for ()
- B for {}

# vim-surround 用法
- operator is s in normal mode, S in visual mode
- hello -> "hello"
- ysiw"

- 'hello' -> "hello"
- csiw"'

- "hello" -> hello
- ds"

- use visual mode: apple -> "apple"
- 選好, S"


# gr (replace 的vim motion)

`
