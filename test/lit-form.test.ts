import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import * as sinon from 'sinon'
import { FieldTemplates } from '../src'
import { forSubmit } from './async-tests'
import LitForm from '../src/lit-form'

describe('lit-form', () => {
  let getTemplate: sinon.SinonStub
  const template: {
    render?: sinon.SinonStub
  } = {}

  const { byName } = FieldTemplates
  before(() => {
    FieldTemplates.byName = name => {
      const registry = byName(name)
      registry.getTemplate = getTemplate
      return registry
    }
  })

  after(() => {
    FieldTemplates.byName = byName
  })

  describe('by default', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(template)
      template.render = sinon.stub()
    })

    it('should render empty form for empty contract', async () => {
      // given
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${{}}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('fieldset')).to.be.null
    })

    it('should render legend for contract title', async () => {
      // given
      const contract = {
        title: 'My first form',
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('legend')!.textContent).to.equal('My first form')
    })

    it('should render wrapper for every field', async () => {
      // given
      const contract = {
        fields: [{}, {}, {}, {}],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelectorAll('.field').length).to.equal(4)
    })

    it('should render every field', async () => {
      // given
      const contract = {
        fields: [{}, {}, {}, {}],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(getTemplate.getCalls().length).to.equal(4)
    })

    it("should render label and assign input's id", async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('label')!.getAttribute('for')).to.be.equal('field_one')
    })

    it("should set label's text to title", async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one', title: 'some important input' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('label')!.textContent).to.be.equal('some important input')
    })

    it("should set label's text to property name is title is not given", async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('label')!.textContent).to.be.equal('field_one')
    })

    it('should pass field id to render call', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      const renderCall = template.render!.firstCall
      expect(renderCall.args[1]).to.equal('field_one')
    })

    it('should pass pre-existing value when rendering field', async () => {
      // given
      const contract = {
        fields: [
          {
            property: 'prop',
          },
        ],
      }
      const value = {
        prop: '10',
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}" .value="${value}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      const renderCall = template.render!.firstCall
      expect(renderCall.args[2]).to.equal('10')
    })

    it('should pass null if pre-existing value is undefined when rendering field', async () => {
      // given
      const contract = {
        fields: [
          {
            property: 'prop',
          },
        ],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}" .value="${{}}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      const renderCall = template.render!.firstCall
      expect(renderCall.args[2]).to.be.null
    })

    it('should pass a change setter which sets value', async () => {
      // given
      template.render!.callsFake(
        (f, id, v, setter) =>
          html`
            <input type="text" @input="${(e: any) => setter(e.target.value)}" />
          `,
      )
      const contract = {
        fields: [
          {
            property: 'test',
          },
        ],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )
      await litForm.updateComplete

      // when
      const element: HTMLInputElement = litForm.form!.querySelector('input')!
      element.value = 'abc'
      const e = new Event('input', {
        bubbles: true,
        cancelable: true,
      })
      element.dispatchEvent(e)

      // then
      expect(litForm.value.test).to.equal('abc')
    })

    it('should not render legend when title is empty', async () => {
      // given
      const contract = {
        fields: [{}],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('legend')).to.be.null
    })

    it("should set form[action] to contract's target", async () => {
      // given
      const contract = {
        target: 'http://exmple.com/resource',
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.getAttribute('action')).to.equal('http://exmple.com/resource')
    })

    it("should set form[method] to contract's method", async () => {
      // given
      const contract = {
        method: 'POST',
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.getAttribute('method')).to.equal('POST')
    })

    it('should pass field to FieldTemplates.getTemplate', async () => {
      // given
      const field = {}
      const contract = {
        fields: [field],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      const getTemplateCall = getTemplate.firstCall
      expect(getTemplateCall.args[0].field).to.equal(field)
    })

    it('does not break when initial value has cycles', async () => {
      // given
      const bar = {
        value: null as any,
      }
      const value = {
        foo: bar,
      }
      bar.value = value
      const litForm = await fixture<any>(
        html`
          <lit-form .contract="${{}}" .value="${value}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.__initialValue).to.deep.equal({})
    })

    describe('when template was not found', () => {
      it('should return a plain input', async () => {
        // given
        getTemplate.returns(null)
        const contract = {
          fields: [{}],
        }
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete

        // then
        expect(litForm.form!.querySelector('.field input')).to.be.not.undefined
      })

      it('should set fallback input value', async () => {
        // given
        getTemplate.returns(null)
        const contract = {
          fields: [
            {
              property: 'test',
            },
          ],
        }
        const value = {
          test: 'qwerty',
        }
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}" .value="${value}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete

        // then
        const input = litForm.form!.querySelector('.field input')! as HTMLInputElement
        expect(input.value).to.be.equal('qwerty')
      })
    })
  })

  describe('when no-labels is set', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(template)
      template.render = sinon.stub()
    })

    it('should not render a label', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form no-labels .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('label')).to.be.null
    })
  })

  describe('when no-legend is set', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(template)
      template.render = sinon.stub()
    })

    it('should not render the <legend> element', async () => {
      // given
      const contract = {
        title: 'should not appear',
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form no-legend .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm.form!.querySelector('legend')).to.be.null
    })
  })

  describe('buttons', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(template)
      template.render = sinon.stub()
    })

    it('should not render a submit button when disabled', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form no-submit-button .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm).shadowDom.to.equalSnapshot()
    })

    it('should render default buttons', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm).shadowDom.to.equalSnapshot()
    })

    it('should allow changing button text', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form
            submit-button-label="Wyślij"
            reset-button-label="Przywróć"
            clear-button-label="Wyczyść"
            .contract="${contract}"
          ></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm).shadowDom.to.equalSnapshot()
    })

    it('should not render a reset button when disabled', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form no-reset-button .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm).shadowDom.to.equalSnapshot()
    })

    it('should not render a clear button when disabled', async () => {
      // given
      const contract = {
        fields: [{ property: 'field_one' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form no-clear-button .contract="${contract}"></lit-form>
        `,
      )

      // when
      await litForm.updateComplete

      // then
      expect(litForm).shadowDom.to.equalSnapshot()
    })
  })

  describe('submit event', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(null)
    })

    it('triggers when form is submitted', async () => {
      // given
      const contract = {
        fields: [{ property: 'name' }, { property: 'age' }, { property: 'nick' }],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )
      await litForm.updateComplete
      Array.prototype.forEach.call(
        litForm.form!.querySelectorAll('input'),
        (input: HTMLInputElement) => {
          // eslint-disable-next-line no-param-reassign
          input.value = 'a'
        },
      )

      // when
      const whenSubmitted = forSubmit(litForm)
      litForm.submit()

      // then
      await whenSubmitted.then(e => {
        Object.keys(e.detail.value).forEach(key => {
          expect(e.detail.value[key]).to.equal('a')
        })
      })
    })

    it("details contain form's action and method", async () => {
      // given
      const contract = {
        target: 'http://example.com/',
        method: 'PATCH',
        fields: [],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )
      await litForm.updateComplete

      // when
      const whenSubmitted = forSubmit(litForm)
      litForm.submit()

      // then
      await whenSubmitted.then(e => {
        expect(e.detail.target).to.equal('http://example.com/')
        expect(e.detail.method).to.equal('PATCH')
      })
    })

    it("details fires with 'GET' method if unspecified in contract", async () => {
      // given
      const contract = {
        fields: [],
      }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}"></lit-form>
        `,
      )
      await litForm.updateComplete

      // when
      const whenSubmitted = forSubmit(litForm)
      litForm.submit()

      // then
      await whenSubmitted.then((e: CustomEvent) => {
        expect(e.detail.method).to.equal('GET')
      })
    })
  })

  describe('clicking clear button', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(null)
    })

    it('sets an empty object as value', async () => {
      // given
      const contract = {
        fields: [{ property: 'name' }],
      }
      const value = { name: 'a' }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}" .value="${value}"></lit-form>
        `,
      )
      await litForm.updateComplete

      // when
      await litForm.clear()

      // then
      expect(litForm.value).to.deep.equal({})
      expect(litForm.form!.querySelector('input')!.value).to.equal('')
    })
  })

  describe('clicking reset button', () => {
    beforeEach(async () => {
      getTemplate = sinon.stub()
      getTemplate.returns(null)
    })

    it('reverts the initially set value', async () => {
      // given
      const contract = {
        fields: [{ property: 'name' }],
      }
      const value = { name: 'a' }
      const litForm = await fixture<LitForm>(
        html`
          <lit-form .contract="${contract}" .value="${value}"></lit-form>
        `,
      )
      await litForm.updateComplete
      litForm.value = { name: 'b' }

      // when
      await litForm.reset()

      // then
      expect(litForm.value).to.deep.equal({ name: 'a' })
    })
  })

  describe('shadow DOM disabled', () => {
    describe('with attribute', () => {
      it('renders to Light DOM', async () => {
        // given
        const contract = {
          title: 'My first form',
        }
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}" no-shadow></lit-form>
          `,
        )

        // when
        await litForm.updateComplete

        // then
        expect(litForm.shadowRoot).to.be.null
      })
    })

    describe('with static property', () => {
      before(() => {
        LitForm.noShadow = true
      })

      after(() => {
        LitForm.noShadow = false
      })

      it('renders to Light DOM', async () => {
        // given
        const contract = {
          title: 'My first form',
        }
        const litForm = await fixture<LitForm>(
          html`
            <lit-form .contract="${contract}"></lit-form>
          `,
        )

        // when
        await litForm.updateComplete

        // then
        expect(litForm.shadowRoot).to.be.null
      })
    })
  })
})
