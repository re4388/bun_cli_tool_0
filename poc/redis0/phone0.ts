function normalizePhoneNumber(phone: string): string {
  // Remove any non-digit characters
  let cleaned = phone.replace(/\D/g, '')

  // Match and capture the phone number in the required format
  let match = cleaned.match(/(?:886)?(\d{9})$/)

  if (match) {
    console.log('match -->', match)
    return match[1]
  } else {
    // unable to match the phone number, could be a different format, like not taiwan phone number
    console.log('no match -->', match)
    return phone
  }

  // If the format is not recognized, return an empty string or handle accordingly
  //   throw new Error('Invalid phone number format')
}

normalizePhoneNumber('88693667511')

// // Test cases
// const phones = ['886936675118', '0936675118', '+886936675118', '886936675118', '']

// phones.forEach((phone) => {
//   console.log(`Original: ${phone}, Normalized: ${normalizePhoneNumber(phone)}`)
// })
