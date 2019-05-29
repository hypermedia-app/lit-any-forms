import TemplateSelectorBuilder from '@lit-any/core/template-registry/TemplateSelectorBuilder'
import FieldTemplateSelector from './TemplateSelector'
import TemplateRegistry, { ComponentSet } from './TemplateRegistry'
import { Criteria, RenderFunc } from './index'
import { IFieldContract } from './contract'

type ComponentMap = {
    [ name in keyof ComponentSet ]: (opts: any) => RenderFunc;
}

// eslint-disable-next-line max-len
export default class FieldTemplateSelectorBuilder extends TemplateSelectorBuilder<Criteria, RenderFunc> {
    private _components: ComponentMap

    // eslint-disable-next-line no-useless-constructor
    public constructor(
        registry: TemplateRegistry
    ) {
        super(registry)
        this._components = registry.components
    }

    public fieldMatches(fieldMatchFunc: (field: IFieldContract) => boolean) {
        this._selector.push(constraint => fieldMatchFunc(constraint.field))

        return this
    }

    // eslint-disable-next-line class-methods-use-this
    protected _createSelector() {
        return new FieldTemplateSelector()
    }

    public rendersComponent(component: { name: keyof ComponentSet; options: unknown}) {
        return this.renders((...args) => {
            if (!this._components) {
                throw new Error('No component set configured')
            }

            const componentFunc = this._components[component.name] ||
                this._components.textbox

            if (!componentFunc) {
                throw new Error('No suitable component found')
            }

            return componentFunc(component.options)(...args)
        })
    }
}
