// @ts-ignore
import { expect } from '@open-wc/testing'
import { textbox } from '../src/components'

describe('components selection', () => {
  describe('textbox', () => {
    it('should set single ine if options are missing', () => {
      // when
      const componentSpec = textbox()

      // then
      expect(componentSpec.options.type).to.equal('single line')
    })
  })
})
