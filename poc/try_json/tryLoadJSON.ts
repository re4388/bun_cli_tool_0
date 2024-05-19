import { loadJson, loadJsonV3 } from './loadJSON_a1.ts'

type VoucherSpec = {
  amount: number
  count: number
}

type Stage = {
  stage: number
  voucherSpecs: VoucherSpec[]
}

type RegisterVoucherSpecConfig = {
  startAt: string
  endAt: string
  stages: Stage[]
}[]

// const a1 = await loadJson<RegisterVoucherSpecConfig>('./foo.json')
// console.log('------->a1: ', a1)

const a2 = await loadJsonV3<RegisterVoucherSpecConfig>('./foo.json')
console.log('------->a1: ', a2)
