import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import { css } from 'lit-element'
import LitForm from '../src/lit-form'
import { FormContract } from '../src/lib/formContract'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

describe('lit-form', () => {
  describe('styled', () => {
    it('applies style to fieldset', async () => {
      // given
      const contract: RecursivePartial<FormContract> = {
        fields: [{ property: 'name' }],
      }
      const fieldsetStyles = css`
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: red;
      `
      const litForm = await fixture<LitForm>(
        `
          <lit-form></lit-form>
        `,
      )

      // when
      litForm.contract = contract as any
      litForm.fieldsetStyles = fieldsetStyles

      // when
      await litForm.updateComplete

      // then
      const fieldsetStyle = getComputedStyle(litForm.form!.querySelector('.fieldset')!)
      expect(fieldsetStyle.borderTopStyle).to.be.equal('solid')
      expect(fieldsetStyle.borderTopColor).to.be.equal('rgb(255, 0, 0)')
      expect(fieldsetStyle.borderTopWidth).to.be.equal('1px')
    })

    it('applies style to field', async () => {
      // given
      const contract: RecursivePartial<FormContract> = {
        fields: [{ property: 'name' }],
      }
      const fieldStyles = css`
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: red;
      `
      const litForm = await fixture<LitForm>(
        `
          <lit-form></lit-form>
        `,
      )

      // when
      litForm.contract = contract as any
      litForm.fieldStyles = fieldStyles

      // when
      await litForm.updateComplete

      // then
      const fieldStyle = getComputedStyle(litForm.form!.querySelector('.field')!)
      expect(fieldStyle.borderTopStyle).to.be.equal('solid')
      expect(fieldStyle.borderTopColor).to.be.equal('rgb(255, 0, 0)')
      expect(fieldStyle.borderTopWidth).to.be.equal('1px')
    })

    it('applies style to form', async () => {
      // given
      const contract: RecursivePartial<FormContract> = {
        fields: [{ property: 'name' }],
      }
      const formStyles = css`
        border-top-style: solid;
        border-top-width: 1px;
        border-top-color: red;
      `
      const litForm = await fixture<LitForm>(
        `
          <lit-form></lit-form>
        `,
      )

      // when
      litForm.contract = contract as any
      litForm.formStyles = formStyles
      await litForm.updateComplete

      // then
      const formStyle = getComputedStyle(litForm.form!)
      expect(formStyle.borderTopStyle).to.be.equal('solid')
      expect(formStyle.borderTopColor).to.be.equal('rgb(255, 0, 0)')
      expect(formStyle.borderTopWidth).to.be.equal('1px')
    })

    it('throws when form style is not CSSResult', done => {
      ;(async () => {
        // given
        const contract: RecursivePartial<FormContract> = {
          fields: [{ property: 'name' }],
        }
        const formStyles = 'border: solid 1px red;'
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}" .formStyles="${formStyles}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete
      })()
        .then(() => done('Should have thrown'))
        .catch(() => done())
    })

    it('throws when fieldset style is not CSSResult', done => {
      ;(async () => {
        // given
        const contract: RecursivePartial<FormContract> = {
          fields: [{ property: 'name' }],
        }
        const fieldsetStyles = 'border: solid 1px red;'
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}" .fieldsetStyles="${fieldsetStyles}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete
      })()
        .then(() => done('Should have thrown'))
        .catch(() => done())
    })

    it('throws when field style is not CSSResult', done => {
      ;(async () => {
        // given
        const contract: RecursivePartial<FormContract> = {
          fields: [{ property: 'name' }],
        }
        const fieldStyles = 'border: solid 1px red;'
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}" .fieldStyles="${fieldStyles}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete
      })()
        .then(() => done('Should have thrown'))
        .catch(() => done())
    })
  })
})
