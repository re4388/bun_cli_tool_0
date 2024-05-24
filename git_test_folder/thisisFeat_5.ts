interface CheckType {
  name: string
  age: number
  address: string
  phone: string
}

function helloWorld(arg: { isCheck: boolean; isAtHome: boolean; checkType: CheckType }) {
  const { isCheck, isAtHome, checkType } = arg
  if (!isCheck) {
    throw new Error('isCheck is false')
  }

  if (isAtHome) {
    console.log('I am at home')
  }

  return checkType.name
}
