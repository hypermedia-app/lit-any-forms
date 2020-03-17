import * as components from './lib/components'

export function textbox(options: components.TextboxOptions = { type: 'single line' }) {
  return {
    name: 'textbox' as const,
    options,
  }
}

export function dropdown(options: components.DropdownOptions) {
  return {
    name: 'dropdown' as const,
    options,
  }
}

export function checkbox() {
  return {
    name: 'checkbox' as const,
    options: {},
  }
}
