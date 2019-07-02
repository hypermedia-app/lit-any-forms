import { FormContract } from './formContract'

function fieldsAreIterable(contract: FormContract) {
  // checks for null and undefined
  if (contract.fields == null) {
    return false
  }
  return typeof contract.fields[Symbol.iterator] === 'function'
}

export function hasAnythingToRender(contract: FormContract) {
  return !!contract.title || fieldsAreIterable(contract)
}
