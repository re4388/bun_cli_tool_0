function replaceNonAlphabetic(text: string): string {
  const regex = /[^a-zA-Z]/g
  return text.replace(regex, '_')
}

async function main() {
  try {
    const text = process.argv.slice(2).join(' ')
    if (text === '') throw new Error('no input')
    const result = replaceNonAlphabetic(text)
    console.log(result)
    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main()
