import { IContract } from './contract'

function fieldsAreIterable(contract: IContract) {
    // checks for null and undefined
    if (contract.fields == null) {
        return false
    }
    return typeof contract.fields[Symbol.iterator] === 'function'
}

function hasAnythingToRender(contract: IContract) {
    return !!contract.title || fieldsAreIterable(contract)
}

export default {
    hasAnythingToRender,
    fieldsAreIterable,
}
