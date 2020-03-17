import { RenderFunc } from '../index'

export function builderFactory<TOptions>() {
  return function builder<T extends TOptions>(fn: (o: T) => RenderFunc) {
    return fn
  }
}
