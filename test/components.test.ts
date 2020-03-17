import { expect } from '@open-wc/testing'
import { textbox, checkbox } from '../src/components'

describe('components', () => {
  describe('textbox', () => {
    it('should set single line if options are missing', () => {
      // when
      const componentSpec = textbox()

      // then
      expect(componentSpec.options.type).to.equal('single line')
    })
  })

  describe('checkbox', () => {
    it('returns some options object', () => {
      // given
      const componentSpec = checkbox()

      // then
      expect(componentSpec.options).to.be.ok
    })
  })
})
