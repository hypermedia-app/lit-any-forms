import { expect } from '@open-wc/testing'
import { textbox } from '../../src/components'

describe('textbox', () => {
  it('should set single line if options are missing', () => {
    // when
    const componentSpec = textbox()

    // then
    expect(componentSpec.options.type).to.equal('single line')
  })
})
