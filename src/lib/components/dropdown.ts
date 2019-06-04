import { RenderFunc } from '../index'
import { FieldContract } from '../formContract'

export interface DropdownItem {
    label: string;
    value: string;
}
export type DropdownItems = DropdownItem[] | Promise<DropdownItem[]>
export interface DropdownOptions {
    items: DropdownItems | ((field: FieldContract) => DropdownItems);
}

export default function builder<T extends DropdownOptions>(fn: (o: T) => RenderFunc) {
    return fn
}
