import * as bcrypt from 'bcrypt'

async function generateBcryptHash(data: string): Promise<string> {
  const saltRounds = 10
  const hash = await bcrypt.hash(data, saltRounds)
  return hash
}

const data = 'Hello, World!'
generateBcryptHash(data)
  .then((bcryptHash) => {
    console.log('bcrypt Hash:', bcryptHash)
  })
  .catch((error) => {
    console.error('Error generating bcrypt hash:', error)
  })
