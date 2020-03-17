import { builderWithOptions } from './builder'

export interface TextboxOptions {
  type: 'single line' | 'multi line'
}

export default builderWithOptions<TextboxOptions>()
