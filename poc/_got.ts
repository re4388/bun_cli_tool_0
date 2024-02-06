// import got from 'got'

// can not use due to this issue
// https://github.com/sindresorhus/got/issues/2299

// const { timings } = await got('https://example.com')
// const { timings } = await got('https://example.com', {
//   timeout: {
//     lookup: 100,
//     connect: 50,
//     secureConnect: 50,
//     socket: 1000,
//     send: 10000,
//     response: 1000
//   }
// }
// )

// Alternatively:
// const { timings } = await got('https://example.com', {
//   timeout: {
//     request: 10000
//   }
// })

// console.log(timings)
