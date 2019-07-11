import { css, CSSResult, LitElement, property, query } from 'lit-element'
import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { hasAnythingToRender } from './lib/contract-helpers'
import FieldTemplates from './lib'
import { FormContract, FieldContract } from './lib/formContract'

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

  @property({ type: String })
  public formStyles: CSSResult | null = null

  @property({ type: String })
  public fieldsetStyles: CSSResult | null = null

  @property({ type: String })
  public fieldStyles: CSSResult | null = null

  // @ts-ignore
  @query('form') public form: HTMLFormElement

  public submit() {
    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {
          value: this.value,
          target: this.form.action,
          method: this.form.getAttribute('method') || this.form.method.toUpperCase(),
        },
      }),
    )
  }

  public async reset() {
    this.value = {}
    await this.requestUpdate()
  }

  public render() {
    if (this.contract) {
      return this.__formTemplate(this.contract)
    }

    return html``
  }

  protected __formTemplate(c: FormContract) {
    this.__assertStyles()

    return html`
      <style>
        form {
            ${this.formStyles}
        }

        .fieldset {
            ${this.fieldsetStyles}
        }

        .field {
            ${this.fieldStyles}
        }
      </style>

      <form
        action="${ifDefined(c.target)}"
        method="${ifDefined(c.method)}"
        @submit="${onSubmit.bind(this)}"
      >
        ${hasAnythingToRender(c) ? this.__fieldsetTemplate(c) : ''}
        ${this.noSubmitButton ? '' : this.__submitButtonTemplate()}
        ${this.noResetButton ? '' : this.__resetButtonTemplate()}
      </form>
    `
  }

  public static get styles() {
    return css`
      :host {
        display: block;
      }
    `
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

  protected __fieldsetTemplate(c: FormContract) {
    return html`
      <div class="fieldset">
        ${this.__fieldsetHeading(c)} ${(c.fields || []).map(f => this.__fieldWrapperTemplate(f))}
      </div>
    `
  }

  protected __fieldWrapperTemplate(field: FieldContract) {
    const fieldId = field.property

    let fieldLabel = html``
    if (this.noLabels === false) {
      fieldLabel = html`
        <label for="${fieldId}">${field.title || field.property}</label>
      `
    }

    return html`
      <div class="field">
        ${fieldLabel} ${this.__fieldTemplate(field, fieldId)}
      </div>
    `
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

    return html`
      ${fieldTemplate.render(field, fieldId, fieldValue, setter)}
    `
  }

  protected __createModelValueSetter(field: FieldContract) {
    return (fieldInput: any) => {
      let newValue = fieldInput

      if (field.valueDecorator && typeof field.valueDecorator.wrap === 'function') {
        newValue = field.valueDecorator.wrap(newValue)
      }

      if (this.value[field.property] !== newValue) {
        this.value[field.property] = newValue

        this.requestUpdate()
      }
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

    return html`
      <legend>${currentContract.title}</legend>
    `
  }

  private __assertStyles() {
    if (this.fieldStyles && !(this.fieldStyles instanceof CSSResult)) {
      throw new Error('Value of fieldStyles must be a CSSResult')
    }

    if (this.fieldsetStyles && !(this.fieldsetStyles instanceof CSSResult)) {
      throw new Error('Value of fieldStyles must be a CSSResult')
    }

    if (this.formStyles && !(this.formStyles instanceof CSSResult)) {
      throw new Error('Value of formStyles must be a CSSResult')
    }
  }
}

window.customElements.define('lit-form', LitForm)
