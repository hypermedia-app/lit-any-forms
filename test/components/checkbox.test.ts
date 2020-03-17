import { expect, fixture, html } from '@open-wc/testing'
import { spy } from 'sinon'
import FallbackComponents from '../../src/lib/FallbackComponents'
import { FieldContract } from '../../src/lib/formContract'

describe('checkbox', () => {
  let field: FieldContract

  beforeEach(() => {
    field = {
      property: 'property',
      title: 'title',
      type: 'type',
      required: false,
      description: 'description',
    }
  })

  it('should not set checked attribute when value is undefined', async () => {
    // given
    const render = FallbackComponents.checkbox()

    // when
    const element = await fixture(
      html`
        ${render(field, 'id', undefined, spy())}
      `,
    )

    // then
    expect(element).to.equalSnapshot()
  })

  it('should not set checked attribute when value is false', async () => {
    // given
    const render = FallbackComponents.checkbox()

    // when
    const element = await fixture(
      html`
        ${render(field, 'id', false, spy())}
      `,
    )

    // then
    expect(element).to.equalSnapshot()
  })

  it('should set checked attribute when value is true', async () => {
    // given
    const render = FallbackComponents.checkbox()

    // when
    const element = await fixture(
      html`
        ${render(field, 'id', true, spy())}
      `,
    )

    // then
    expect(element).to.equalSnapshot()
  })

  it('should set checked attribute when value is truthy', async () => {
    // given
    const render = FallbackComponents.checkbox()

    // when
    const element = await fixture(
      html`
        ${render(field, 'id', 'foo', spy())}
      `,
    )

    // then
    expect(element).to.equalSnapshot()
  })

  it('sets value when checked', async () => {
    // given
    const render = FallbackComponents.checkbox()
    const setter = spy()

    // when
    const element = await fixture<HTMLInputElement>(
      html`
        ${render(field, 'id', false, setter)}
      `,
    )
    element.click()

    // then
    expect(setter.firstCall.args[0]).to.eq(true)
  })

  it('unsets value when unchecked', async () => {
    // given
    const render = FallbackComponents.checkbox()
    const setter = spy()

    // when
    const element = await fixture<HTMLInputElement>(
      html`
        ${render(field, 'id', true, setter)}
      `,
    )
    element.click()

    // then
    expect(setter.firstCall.args[0]).to.eq(false)
  })
})
