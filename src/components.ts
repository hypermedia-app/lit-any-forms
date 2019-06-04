import { ComponentSet, DropdownOptions, TextboxOptions } from './lib/components'

export function textbox(options: TextboxOptions = { type: 'single line' }) {
    return {
        name: 'textbox' as keyof ComponentSet,
        options,
    }
}

export function dropdown(options: DropdownOptions) {
    return {
        name: 'dropdown' as keyof ComponentSet,
        options,
    }
}
