import { writeJsonFile } from 'write-json-file'

let a1 = [
  {
    startAt: '2024-03-11T16:00:00+00:00',
    endAt: '2024-05-28T15:59:59+00:00',
    stages: [
      {
        stage: 0,
        voucherSpecs: [
          { amount: 50, count: 2 },
          { amount: 10, count: 12 }
        ]
      },
      {
        stage: 1,
        voucherSpecs: [{ amount: 10, count: 12 }]
      },
      {
        stage: 2,
        voucherSpecs: [{ amount: 10, count: 12 }]
      },
      {
        stage: 3,
        voucherSpecs: [{ amount: 5, count: 10 }]
      },
      {
        stage: 4,
        voucherSpecs: [{ amount: 5, count: 10 }]
      },
      {
        stage: 5,
        voucherSpecs: [
          { amount: 6, count: 1 },
          { amount: 5, count: 10 }
        ]
      }
    ]
  },
  {
    startAt: '2024-06-29T16:00:00+00:00',
    endAt: '2025-05-28T15:59:59+00:00',
    stages: [
      {
        stage: 0,
        voucherSpecs: [
          { amount: 50, count: 2 },
          { amount: 10, count: 10 }
        ]
      },
      {
        stage: 1,
        voucherSpecs: [{ amount: 10, count: 10 }]
      },
      {
        stage: 2,
        voucherSpecs: [{ amount: 10, count: 10 }]
      },
      {
        stage: 3,
        voucherSpecs: [{ amount: 5, count: 10 }]
      },
      {
        stage: 4,
        voucherSpecs: [{ amount: 5, count: 10 }]
      },
      {
        stage: 5,
        voucherSpecs: [{ amount: 5, count: 10 }]
      }
    ]
  }
]

await writeJsonFile('foo.json', a1)
