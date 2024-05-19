// read json file
const path = '/Users/re4388/project/personal/lang/bun/bun_cli_0/poc/row_data_check.json'

const file = Bun.file(path)
const stream = file.stream()

for await (const chunk of stream) {
  console.log('chunk', chunk)
}
