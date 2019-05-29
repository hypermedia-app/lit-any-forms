import TemplateRegistry from '@lit-any/core/template-registry'
import { TemplateResult } from 'lit-html'
import * as fallbackComponents from './FallbackComponents'
import TemplateSelectorBuilder from './TemplateSelectorBuilder'
import { Criteria, RenderFunc } from './index'
import { IFieldContract } from './contract'

export interface ButtonOptions {
    label: string;
    onClick: (e: Event & any) => void;
}

export interface DropdownItem {
    label: string;
    value: string;
}
export type DropdownItems = DropdownItem[] | Promise<DropdownItem[]>
export interface DropdownOptions {
    items: DropdownItems | ((field: IFieldContract) => DropdownItems);
}

export interface TextboxOptions {
    type: 'single line' | 'multi line';
}

export interface ComponentSet {
    textbox?: (opts: TextboxOptions) => RenderFunc;
    dropdown?: (opts: DropdownOptions) => RenderFunc;
}
interface ButtonComponent {
    button?: (opts: ButtonOptions) => TemplateResult;
}

export default class FormTemplateRegistry extends TemplateRegistry<TemplateSelectorBuilder, Criteria, RenderFunc> {
    public components: ComponentSet & ButtonComponent

    public constructor(name: string) {
        super(name)
        this.components = fallbackComponents
    }

    public useComponents(components: ComponentSet) {
        this.components = components || fallbackComponents
        return this
    }

    protected _createBuilder() {
        return new TemplateSelectorBuilder(this)
    }
}
