import { ComponentSet, DropdownOptions, TextboxOptions } from './lib/components'

export function textbox<T extends TextboxOptions>(options: T) {
    return {
        name: 'textbox' as keyof ComponentSet,
        options,
    }
}

export function dropdown<T extends DropdownOptions>(options: T) {
    return {
        name: 'dropdown' as keyof ComponentSet,
        options,
    }
}
