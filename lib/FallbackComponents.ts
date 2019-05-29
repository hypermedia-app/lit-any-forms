import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { until } from 'lit-html/directives/until'
import { RenderFunc } from './index'
import {
    ButtonOptions, DropdownItem, DropdownOptions, TextboxOptions,
} from './TemplateRegistry'

export function textbox({
    type = 'single line',
}: TextboxOptions): RenderFunc {
    return (f, id, v, set) => {
        if (type === 'multi line') {
            return html`<textarea id="${id}"
                                  @input="${(e: Event & any) => set(e.target.value)}"
                                  ?required="${f.required}"
                                  value="${v || ''}"></textarea>`
        }

        return html`<input id="${id}"
                           type="text"
                           ?required="${f.required}"
                           @input="${(e: Event & any) => set(e.target.value)}"
                           value="${v || ''}">`
    }
}

export function dropdown({
    items,
}: DropdownOptions): RenderFunc {
    return (f, id, v, set) => {
        const optionsToRender = Promise.resolve()
            .then(() => {
                if (typeof items === 'function') {
                    return items(f)
                }

                return items
            })

        function renderOption(option: DropdownItem) {
            return html`<option value="${option.value}" 
                                ?selected="${option.value === v}" 
                                label="${option.label}"></option>`
        }

        const optionElements = optionsToRender.then(resolved => html`${repeat(resolved, renderOption)}`)

        return html`
<select id="${id}" @change="${(e: Event & any) => set(e.target.value)}" ?required="${f.required}">
    ${until(optionElements, '')}
</select>`
    }
}

export function button({
    label, onClick,
}: ButtonOptions) {
    return html`<input type="button" value="${label}" @click="${onClick}">`
}
