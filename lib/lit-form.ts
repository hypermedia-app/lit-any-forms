import { LitElement, property, query } from 'lit-element'
import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import contract from './contract-helpers'
import FieldTemplates from '.'
import { FormContract, FieldContract } from './formContract'

function onSubmit(this: LitForm, e: Event) {
    this.submit()
    e.preventDefault()
    return false
}

export default class LitForm extends LitElement {
    @property({ type: Object, attribute: false })
    public contract: FormContract | null = null

    @property({ type: Boolean, attribute: 'no-labels', reflect: true })
    public noLabels = false

    @property({ type: Object, attribute: false })
    public value: { [key: string]: any } = {}

    @property({ type: String, attribute: 'submit-button-label' })
    public submitButtonLabel = 'Submit'

    @property({ type: Boolean, attribute: 'no-submit-button', reflect: true })
    public noSubmitButton = false

    @property({ type: String, attribute: 'reset-button-label' })
    public resetButtonLabel = 'Reset'

    @property({ type: Boolean, attribute: 'no-reset-button', reflect: true })
    public noResetButton = false

    @property({ type: String, attribute: 'template-registry' })
    public templateRegistry = ''

    // @ts-ignore
    @query('form') public form: HTMLFormElement

    public submit() {
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                value: this.value,
                target: this.form.action,
                method: this.form.getAttribute('method') || this.form.method.toUpperCase(),
            },
        }))
    }

    public async reset() {
        this.value = {}
        await this.requestUpdate()
    }

    public render() {
        if (this.contract) {
            return this.__formTemplate()
        }

        return html``
    }

    protected __formTemplate() {
        return html`<style>
                    ${this.__stylesheet()}
                </style>

            <form action="${ifDefined(this.contract.target)}"
                 method="${ifDefined(this.contract.method)}" 
                 @submit="${onSubmit.bind(this)}">
                ${contract.hasAnythingToRender(this.contract) ? this.__fieldsetTemplate() : ''}
                
                ${this.noSubmitButton ? '' : this.__submitButtonTemplate()}
                ${this.noResetButton ? '' : this.__resetButtonTemplate()}
            </form>`
    }

    // eslint-disable-next-line class-methods-use-this
    protected __stylesheet() { // TODO: use base lit-element for this
        return `:host {
                        display: block;
                    }
                
                    form {
                        @apply --lit-form-form;
                    }
                    
                    .fieldset {
                        @apply --lit-form-fieldset;
                    }
                    
                    .field {
                        @apply --lit-form-field;
                    }`
    }

    protected __submitButtonTemplate() {
        return FieldTemplates.byName(this.templateRegistry).components.button({
            label: this.submitButtonLabel,
            onClick: this.submit.bind(this),
        })
    }

    protected __resetButtonTemplate() {
        return FieldTemplates.byName(this.templateRegistry).components.button({
            label: this.resetButtonLabel,
            onClick: this.reset.bind(this),
        })
    }

    protected __fieldsetTemplate() {
        let fieldsArray: FieldContract[] = []
        if (contract.fieldsAreIterable(this.contract)) {
            fieldsArray = this.contract.fields
        }

        return html`
            <div class="fieldset">
                ${this.__fieldsetHeading(this.contract)}
                
                ${fieldsArray.map(f => this.__fieldWrapperTemplate(f))}
            </div>`
    }

    protected __fieldWrapperTemplate(field: FieldContract) {
        const fieldId = field.property

        let fieldLabel = html``
        if (this.noLabels === false) {
            fieldLabel = html`<label for="${fieldId}">${field.title || field.property}</label>`
        }

        return html`<div class="field">
                        ${fieldLabel}
                        ${this.__fieldTemplate(field, fieldId)}
                    </div>`
    }

    protected __fieldTemplate(field: FieldContract, fieldId: string) {
        const setter = this.__createModelValueSetter(field)

        const fieldTemplate = FieldTemplates.byName(this.templateRegistry).getTemplate({ field })
        const fieldValue = this.__getPropertyValue(field, this.value)

        if (fieldTemplate === null) {
            const renderFunc = FieldTemplates.byName(this.templateRegistry).components.textbox({
                type: 'single line',
            })
            return renderFunc(field, fieldId, fieldValue, setter)
        }

        return html`${fieldTemplate.render(field, fieldId, fieldValue, setter)}`
    }

    protected __createModelValueSetter(field: FieldContract) {
        return (fieldInput: any) => {
            let newValue = fieldInput

            if (field.valueDecorator && typeof field.valueDecorator.wrap === 'function') {
                newValue = field.valueDecorator.wrap(newValue)
            }

            this.value[field.property] = newValue
        }
    }

    // eslint-disable-next-line class-methods-use-this
    protected __getPropertyValue(field: FieldContract, model: any) {
        let value = model[field.property] || null

        if (value && field.valueDecorator && typeof field.valueDecorator.unwrap === 'function') {
            value = field.valueDecorator.unwrap(value)
        }

        return value
    }

    // eslint-disable-next-line class-methods-use-this
    protected __fieldsetHeading(currentContract: FormContract) {
        if (!currentContract.title) {
            return html``
        }

        return html`<legend>${currentContract.title}</legend>`
    }
}

window.customElements.define('lit-form', LitForm)
