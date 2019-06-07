// @ts-ignore
import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import * as sinon from 'sinon'
import { FieldTemplates } from '..'
import { css } from 'lit-element'
import { forSubmit } from './async-tests'

describe('lit-form', () => {
    let litForm
    let getTemplate
    const template = {}

    const { byName } = FieldTemplates
    FieldTemplates.byName = (name) => {
        const registry = byName(name)
        registry.getTemplate = getTemplate
        return registry
    }

    describe('by default', () => {
        beforeEach(async () => {
            litForm = await fixture('<lit-form></lit-form>')
            getTemplate = sinon.stub()
            getTemplate.returns(template)
            template.render = sinon.spy()
        })

        it('should render empty form for empty contract', async () => {
            // given
            litForm.contract = {}

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('fieldset')).to.be.null
        })

        it('should render legend for contract title', async () => {
            // given
            litForm.contract = {
                title: 'My first form',
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('legend').textContent).to.equal('My first form')
        })

        it('should render wrapper for every field', async () => {
            // given
            litForm.contract = {
                fields: [{}, {}, {}, {}],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelectorAll('.field').length).to.equal(4)
        })

        it('should render every field', async () => {
            // given
            litForm.contract = {
                fields: [{}, {}, {}, {}],
            }

            // when
            await litForm.updateComplete

            // then
            expect(getTemplate.getCalls().length).to.equal(4)
        })

        it('should render label and assign input\'s id', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one' }],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('label').getAttribute('for')).to.be.equal('field_one')
        })

        it('should set label\'s text to title', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one', title: 'some important input' }],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('label').textContent).to.be.equal('some important input')
        })

        it('should set label\'s text to property name is title is not given', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one' }],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('label').textContent).to.be.equal('field_one')
        })

        it('should pass field id to render call', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one' }],
            }

            // when
            await litForm.updateComplete

            // then
            const renderCall = template.render.firstCall
            expect(renderCall.args[1]).to.equal('field_one')
        })

        it('should pass pre-existing value when rendering field', async () => {
            // given
            litForm.contract = {
                fields: [{
                    property: 'prop',
                }],
            }
            litForm.value = {
                prop: '10',
            }

            // when
            await litForm.updateComplete

            // then
            const renderCall = template.render.firstCall
            expect(renderCall.args[2]).to.equal('10')
        })

        it('should pass null if pre-existing value is undefined when rendering field', async () => {
            // given
            litForm.contract = {
                fields: [{
                    property: 'prop',
                }],
            }
            litForm.value = {}

            // when
            await litForm.updateComplete

            // then
            const renderCall = template.render.firstCall
            expect(renderCall.args[2]).to.be.null
        })

        it('should pass a change setter which sets value', async () => {
            // given
            template.render = (f, id, v, setter) => html`<input type="text" @input="${e => setter(e.target.value)}" />`
            litForm.contract = {
                fields: [{
                    property: 'test',
                }],
            }
            await litForm.updateComplete

            // when
            const element = litForm.form.querySelector('input')
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
            litForm.contract = {
                fields: [{}],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('legend')).to.be.null
        })

        it('should set form[action] to contract\'s target', async () => {
            // given
            litForm.contract = {
                target: 'http://exmple.com/resource',
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.getAttribute('action')).to.equal('http://exmple.com/resource')
        })

        it('should set form[method] to contract\'s method', async () => {
            // given
            litForm.contract = {
                method: 'POST',
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.getAttribute('method')).to.equal('POST')
        })

        it('should pass field to FieldTemplates.getTemplate', async () => {
            // given
            const field = {}
            litForm.contract = {
                fields: [field],
            }

            // when
            await litForm.updateComplete

            // then
            const getTemplateCall = getTemplate.firstCall
            expect(getTemplateCall.args[0].field).to.equal(field)
        })

        describe('when template was not found', () => {
            it('should return a plain input', async () => {
                // given
                getTemplate.returns(null)
                litForm.contract = {
                    fields: [{}],
                }

                // when
                await litForm.updateComplete

                // then
                expect(litForm.form.querySelector('.field input')).to.be.not.undefined
            })

            it('should set fallback input value', async () => {
                // given
                getTemplate.returns(null)
                litForm.contract = {
                    fields: [{
                        property: 'test',
                    }],
                }
                litForm.value = {
                    test: 'qwerty',
                }

                // when
                await litForm.updateComplete

                // then
                expect(litForm.form.querySelector('.field input').value).to.be.equal('qwerty')
            })
        })
    })

    describe('when no-labels is set', () => {
        beforeEach(async () => {
            litForm = await fixture('<lit-form no-labels></lit-form>')
            getTemplate = sinon.stub()
            getTemplate.returns(template)
            template.render = sinon.spy()
        })

        it('should not render a label', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one' }],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('label')).to.be.null
        })
    })

    describe('when no-submit-button is set', () => {
        beforeEach(async () => {
            litForm = await fixture('<lit-form no-submit-button></lit-form>')
            getTemplate = sinon.stub()
            getTemplate.returns(template)
            template.render = sinon.spy()
        })

        it('should not render a submit button', async () => {
            // given
            litForm.contract = {
                fields: [{ property: 'field_one' }],
            }

            // when
            await litForm.updateComplete

            // then
            expect(litForm.form.querySelector('button')).to.be.null
        })
    })

    describe('submit event', () => {
        beforeEach(async () => {
            litForm = await fixture('<lit-form></lit-form>')
            getTemplate = sinon.stub()
            getTemplate.returns(null)
        })

        it('triggers when form is submitted', async () => {
            // given
            litForm.contract = {
                fields: [
                    { property: 'name' },
                    { property: 'age' },
                    { property: 'nick' },
                ],
            }
            await litForm.updateComplete
            Array.prototype.forEach.call(litForm.form.querySelectorAll('input'), (input) => {
                // eslint-disable-next-line no-param-reassign
                input.value = 'a'
            })

            // when
            const whenSubmitted = forSubmit(litForm)
            litForm.submit()

            // then
            await whenSubmitted.then((e) => {
                Object.keys(e.detail.value).forEach((key) => {
                    expect(e.detail.value[key]).to.equal('a')
                })
            })
        })

        it('details contain form\'s action and method', async () => {
            // given
            litForm.contract = {
                target: 'http://example.com/',
                method: 'PATCH',
                fields: [
                ],
            }
            await litForm.updateComplete

            // when
            const whenSubmitted = forSubmit(litForm)
            litForm.submit()

            // then
            await whenSubmitted.then((e) => {
                expect(e.detail.target).to.equal('http://example.com/')
                expect(e.detail.method).to.equal('PATCH')
            })
        })

        it('details fires with \'GET\' method if unspecified in contract', async () => {
            // given
            litForm.contract = {
                fields: [
                ],
            }
            await litForm.updateComplete

            // when
            const whenSubmitted = forSubmit(litForm)
            litForm.submit()

            // then
            await whenSubmitted.then((e) => {
                expect(e.detail.method).to.equal('GET')
            })
        })
    })

    describe('clicking clear button', () => {
        beforeEach(async () => {
            litForm = await fixture('<lit-form></lit-form>')
            getTemplate = sinon.stub()
            getTemplate.returns(null)
        })

        it('sets an empty object as value', async () => {
            // given
            litForm.contract = {
                fields: [
                    { property: 'name' },
                ],
            }
            litForm.value = { name: 'a' }
            await litForm.updateComplete

            // when
            await litForm.reset()

            // then
            expect(litForm.value).to.deep.equal({})
            expect(litForm.form.querySelector('input').value).to.equal('')
        })
    })

    describe('styled', () => {
        beforeEach(async () => {
            litForm = await fixture(`<lit-form></lit-form>`)
            getTemplate = sinon.stub()
            getTemplate.returns(null)
        })

        it('applies style to fieldset', async () => {
            // given
            litForm.contract = {
                fields: [
                    { property: 'name' },
                ],
            }
            litForm.fieldsetStyles = css`border: solid 1px red;`

            // when
            await litForm.updateComplete

            // then
            const fieldsetStyle = getComputedStyle(litForm.form.querySelector('.fieldset'))
            expect(fieldsetStyle.borderTopStyle).to.be.equal('solid')
            expect(fieldsetStyle.borderBottomColor).to.be.equal('rgb(255, 0, 0)')
            expect(fieldsetStyle.borderLeftWidth).to.be.equal('1px')
        })

        it('applies style to field', async () => {
            // given
            litForm.contract = {
                fields: [
                    { property: 'name' },
                ],
            }
            litForm.fieldStyles = css`border: solid 1px red;`

            // when
            await litForm.updateComplete

            // then
            const fieldStyle = getComputedStyle(litForm.form.querySelector('.field'))
            expect(fieldStyle.borderTopStyle).to.be.equal('solid')
            expect(fieldStyle.borderBottomColor).to.be.equal('rgb(255, 0, 0)')
            expect(fieldStyle.borderLeftWidth).to.be.equal('1px')
        })

        it('applies style to form', async () => {
            // given
            litForm.contract = {
                fields: [
                    { property: 'name' },
                ],
            }
            litForm.formStyles = css`border: solid 1px red;`

            // when
            await litForm.updateComplete

            // then
            const formStyle = getComputedStyle(litForm.form)
            expect(formStyle.borderTopStyle).to.be.equal('solid')
            expect(formStyle.borderBottomColor).to.be.equal('rgb(255, 0, 0)')
            expect(formStyle.borderLeftWidth).to.be.equal('1px')
        })

        it('throws when form style is not CSSResult', (done) => {
            (async () => {
                // given
                litForm.contract = {
                    fields: [
                        { property: 'name' },
                    ],
                }
                litForm.formStyles = `border: solid 1px red;`

                // when
                await litForm.updateComplete
            })()
                .then(() => done('Should have thrown'))
                .catch(() => done())
        })

        it('throws when fieldset style is not CSSResult', (done) => {
            (async () => {
                // given
                litForm.contract = {
                    fields: [
                        { property: 'name' },
                    ],
                }
                litForm.fieldsetStyles = `border: solid 1px red;`

                // when
                await litForm.updateComplete
            })()
                .then(() => done('Should have thrown'))
                .catch(() => done())
        })

        it('throws when field style is not CSSResult', (done) => {
            (async () => {
                // given
                litForm.contract = {
                    fields: [
                        { property: 'name' },
                    ],
                }
                litForm.fieldStyles = `border: solid 1px red;`

                // when
                await litForm.updateComplete
            })()
                .then(() => done('Should have thrown'))
                .catch(() => done())
        })
    })
})
