import { builderFactory } from './builder'

export interface TextboxOptions {
  type: 'single line' | 'multi line'
}

export default builderFactory<TextboxOptions>()
