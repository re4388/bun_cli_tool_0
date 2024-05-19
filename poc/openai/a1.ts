import OpenAI from 'openai'

const openai = new OpenAI()

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content:
          '幫我把這段中文 (借著特斯拉剎車事件 我來聊聊人性 媒體操控和洗腦) 翻譯成英文。另外請把這段變成一個英文的變數名稱，依照python的命名規則。請給我一個結構化的JSON結果，不要有多餘的字。'
      }
    ],
    model: 'gpt-3.5-turbo'
  })

  const content = completion.choices[0].message.content!
  if (content === null) throw new Error('No content returned from OpenAI')
  console.log('=====> content: ', content)

  // const { result } = content
  // if (result !== undefined) {
  //   console.log('=====> result: ', result)
  //   return result
  // } else {
  //   console.log('The object does not have the "result" property')
  //   throw new Error('OpenAI 沒有依照指示提供 result 屬性')
  // }
}

main()
