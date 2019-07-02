export interface FormContract {
  title: string
  description: string
  fields: FieldContract[]
  method: string
  target: string
}

interface ValueDecorator {
  wrap(a: any): any
  unwrap(a: any): any
}

export interface FieldContract {
  property: string
  type: string
  required: boolean
  title: string
  description: string
  valueDecorator?: ValueDecorator
}
