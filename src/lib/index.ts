import { TemplateResult } from 'lit-html'
import createRegistry from './factory'
import { FieldContract } from './formContract'

export interface Criteria {
    field: FieldContract;
}

export default {
    default: createRegistry(),
    byName: createRegistry,
}

type Setter = (value: unknown) => void
export type RenderFunc = (f: FieldContract, id: string, v: unknown, set: Setter) => TemplateResult
