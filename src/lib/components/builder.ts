import { RenderFunc } from '../index'

export function builderWithOptions<TOptions>() {
  return function builder<T extends TOptions>(fn: (o: TOptions) => RenderFunc) {
    return fn
  }
}

export function builderWithoutOptions() {
  return function builder(fn: () => RenderFunc) {
    return fn
  }
}
