import { RenderFunc } from '../index'

export interface TextboxOptions {
  type: 'single line' | 'multi line'
}

export default function builder<TOptions extends TextboxOptions>(fn: (o: TOptions) => RenderFunc) {
  return fn
}
