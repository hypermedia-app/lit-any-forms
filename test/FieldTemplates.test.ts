import { expect } from '@open-wc/testing'
import { FieldTemplates } from '../src'
import FieldTemplateSelectorBuilder from '../src/lib/TemplateSelectorBuilder'

describe('FieldTemplates', () => {
  describe('when builder is created', () => {
    let builder: FieldTemplateSelectorBuilder

    beforeEach(() => {
      builder = FieldTemplates.default.when
    })

    it('should create builder for matching field', () => {
      expect(builder.fieldMatches).to.be.ok
    })
  })
})
