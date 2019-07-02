import { TemplateResult } from 'lit-html'
import createRegistry from './factory'
import { FieldContract } from './formContract'
import FormTemplateRegistry from './TemplateRegistry'

export interface Criteria {
  field: FieldContract
}

export default {
  default: createRegistry() as FormTemplateRegistry,
  byName: createRegistry,
}

type Setter = (value: unknown) => void
export type RenderFunc = (f: FieldContract, id: string, v: unknown, set: Setter) => TemplateResult
