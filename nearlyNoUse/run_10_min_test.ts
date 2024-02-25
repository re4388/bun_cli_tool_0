// Function to log "Hello, World!" every 2 seconds
function logHello() {
  console.log('Hello, World!')
  console.log(new Date().toLocaleTimeString())
  setTimeout(logHello, 2000) // Call logHello() again after 2 seconds
}

// Main function
function main() {
  console.log('Starting script...')

  // Start logging "Hello, World!"
  logHello()

  // Set timeout to exit after 10 minutes
  setTimeout(
    () => {
      console.log('Exiting script after 10 minutes...')
      process.exit(0) // Exit with code 0 (success)
    },
    10 * 60 * 1000
  ) // 10 minutes in milliseconds
}

// Run the main function
main()
