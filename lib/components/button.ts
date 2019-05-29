import { TemplateResult } from 'lit-html'

export interface ButtonOptions {
    label: string;
    onClick: (e: Event & any) => void;
}

export default function builder(fn: (o: ButtonOptions) => TemplateResult) {
    return fn
}
