import OpenAI from 'openai'
import { question } from 'zx'

const text = await question('question? ')

const openAPIKey = process.env.OPENAI_API_KEY as string

const openai = new OpenAI({
  baseURL: 'https://api.portkey.ai/v1', // Point to Portkey's gateway URL
  apiKey: openAPIKey,
  defaultHeaders: {
    'x-portkey-api-key': 'mYJA4Ok7PYnPGHU9KVCtEmV82+M=',
    'x-portkey-provider': 'openai',
    'Content-Type': 'application/json'
  }
})

async function main() {
  const stream = await openai.chat.completions.create({
    messages: [{ role: 'user', content: text }],
    model: 'gpt-3.5-turbo-0125',
    stream: true
  })

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

main()
