import { DropdownOptions, TextboxOptions } from './lib/components'

export function textbox<T extends TextboxOptions>(options: T) {
    return {
        name: 'textbox',
        options,
    }
}

export function dropdown<T extends DropdownOptions>(options: T) {
    return {
        name: 'dropdown',
        options,
    }
}
