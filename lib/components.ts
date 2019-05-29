import { DropdownOptions, TextboxOptions } from './TemplateRegistry'

export function textbox(options: TextboxOptions) {
    return {
        name: 'textbox',
        options,
    }
}

export function dropdown(options: DropdownOptions) {
    return {
        name: 'dropdown',
        options,
    }
}
