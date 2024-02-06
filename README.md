


# 留意
- 這邊的 env 吃 zsh 的 .env, 因為 scripts 會從 global 跑起來

# bun_cli_0

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run parent.ts
```

This project was created using `bun init` in bun v1.0.22. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


to install pkg:
```bash
bun add figlet
bun add -d @types/figlet 
```



# related packages
- [yargs/yargs: yargs the modern, pirate-themed successor to optimist.](https://github.com/yargs/yargs)
- [Top 12 Libraries to build CLI Tools in Node.js](https://byby.dev/node-command-line-libraries)




# some lib only support ESM
- since I only use ts-node to run these cli tools -> use mts as file extension
