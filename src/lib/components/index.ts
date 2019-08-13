import { TemplateResult } from 'lit-html'
import { RenderFunc } from '../index'
import { DropdownOptions } from './dropdown'
import { ButtonOptions } from './button'
import { TextboxOptions } from './textbox'

export { TextboxOptions } from './textbox'
export { DropdownOptions } from './dropdown'
export { ButtonOptions } from './button'

export interface ComponentSet {
  textbox?: (opts: TextboxOptions) => RenderFunc
  dropdown?: (opts: DropdownOptions) => RenderFunc
}
export interface ButtonComponent {
  button: (opts: ButtonOptions) => TemplateResult
}
