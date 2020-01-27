export interface ObjectDescription {
  title: string
  description?: string
  fields: (SimpleField | NestedField)[]
}

export interface FormContract extends ObjectDescription {
  method: string
  target: string
}

interface ValueDecorator {
  wrap(a: any): any
  unwrap(a: any): any
}

export interface FieldContract {
  property: string
  required?: boolean
  title?: string
  description?: string
  valueDecorator?: ValueDecorator
}

export interface SimpleField extends FieldContract {
  type: string
}

export interface NestedField extends FieldContract {
  type: ObjectDescription
}
