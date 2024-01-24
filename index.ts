import { $ } from "bun";
// https://bun.sh/blog/the-bun-shell
// https://github.com/oven-sh/bun/blob/b433beb016470b87850f3c018974de5f2e355d52/docs/runtime/shell.md?plain=1#L359

console.log("apple")

// const scripts = await $`ls ./scripts | fzf`
// const script_file = scripts.stdout.toString()
// const cmd = `bun run ./scripts/${script_file}`
// console.log("------->cmd: ", cmd);
// await $`${cmd}`



// way1: no switch case, get path and also use `bun shell` to run it
// way2: no switch case,

// const foo = Bun.file("./scripts"); // relative to cwd






// to stdout:

// //




// read all the files in the current directory
// const files = await readdir("./scripts");
// console.log("------->files: ", files);










// // to string:
// const text = await $`ls *.js`.text();
// console.log("------->text: ", text);



// const buffer = new Response("bar\n foo\n bar\n foo\n");
// await $`grep foo < ${buffer}`;



// const response = await fetch("https://example.com");
// console.log("------->response: ", response);


// const result = await $`echo "Hello World!" | wc -w`.text();
// console.log(result); // 2\n


// change working dir
// await $`pwd`.cwd("/tmp"); // /tmp
// await $`ls *.js`;
