const { Translate } = require('@google-cloud/translate').v2

// Creates a client
const translate = new Translate()

const text = process.argv.slice(2).join(' ')
const target = 'en'

if (text === '') throw new Error('No text to translate')

async function translateText() {
  return await translate.translate(text, target)
}

async function main() {
  return new Promise(async (resolve, reject) => {
    // 设置一个超时
    setTimeout(() => {
      reject(new Error('5秒 timeout, 可能 gcp 帳號設定錯誤'))
    }, 5000) // 5 秒钟后超时

    const translatedText = await translateText()
    resolve(translatedText[0])
  })
}

main()
  .then((result) => {
    console.log(result)
    process.exit(0)
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  })
