import * as components from './lib/components'

export function textbox(options: components.TextboxOptions = { type: 'single line' }) {
  return {
    name: 'textbox' as keyof components.ComponentSet,
    options,
  }
}

export function dropdown(options: components.DropdownOptions) {
  return {
    name: 'dropdown' as keyof components.ComponentSet,
    options,
  }
}

export function checkbox() {
  return {
    name: 'checkbox' as keyof components.ComponentSet,
  }
}
