import { expect } from '@open-wc/testing'
import * as sinon from 'sinon'
import FieldTemplateSelectorBuilder from '../src/lib/TemplateSelectorBuilder'

describe('FieldTemplateSelectorBuilder', () => {
  let builder: any

  beforeEach(() => {
    builder = new FieldTemplateSelectorBuilder({} as any)
  })

  describe('adding field matcher function', () => {
    it('creates a matcher', () => {
      // given
      const field = {}
      const matchFunc = sinon.stub().returns(true)

      // when
      builder.fieldMatches(matchFunc)

      // then
      const matcher = builder._selector._matchers[0]
      expect(matcher({ field })).to.be.true
      expect(matchFunc.firstCall.args[0]).to.be.equal(field)
    })
  })
})
