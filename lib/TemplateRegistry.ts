import TemplateRegistry from '@lit-any/core/template-registry'
import fallbackComponents from './FallbackComponents'
import TemplateSelectorBuilder from './TemplateSelectorBuilder'
import { Criteria, RenderFunc } from './index'
import { ButtonComponent, ComponentSet } from './components'

// eslint-disable-next-line max-len
export default class FormTemplateRegistry extends TemplateRegistry<TemplateSelectorBuilder, Criteria, RenderFunc> {
    public components: ComponentSet & ButtonComponent

    public constructor(name: string) {
        super(name)
        this.components = fallbackComponents
    }

    public useComponents(components: ComponentSet) {
        this.components = {
            ...fallbackComponents,
            ...components,
        }
        return this
    }

    protected _createBuilder() {
        return new TemplateSelectorBuilder(this)
    }
}
