import { TemplateResult } from 'lit-html'
import createRegistry from './factory'
import { IFieldContract } from './contract'

export interface Criteria {
    field: IFieldContract;
}

export default {
    default: createRegistry(),
    byName: createRegistry,
}

type Setter = (value: unknown) => void
export type RenderFunc = (f: IFieldContract, id: string, v: unknown, set: Setter) => TemplateResult
