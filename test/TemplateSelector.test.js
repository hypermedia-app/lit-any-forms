import { expect } from '@open-wc/testing'
import TemplateSelector from '../lib/TemplateSelector'

describe('FieldTemplateSelector', () => {
  let selector

  beforeEach(() => {
    selector = new TemplateSelector()
  })

  describe('shouldMatch', () => {
    it('returns false if field is null', () => {
      // given
      const criteria = { field: null }

      // when
      const shouldMatch = selector.shouldMatch(criteria)

      // then
      expect(shouldMatch).to.be.false
    })

    it('returns false if field is undefined', () => {
      // given
      const criteria = { }

      // when
      const shouldMatch = selector.shouldMatch(criteria)

      // then
      expect(shouldMatch).to.be.false
    })

    it('returns false if field.property is null', () => {
      // given
      const criteria = { field: { property: null } }

      // when
      const shouldMatch = selector.shouldMatch(criteria)

      // then
      expect(shouldMatch).to.be.false
    })

    it('returns false if field.property is undefined', () => {
      // given
      const criteria = { field: {} }

      // when
      const shouldMatch = selector.shouldMatch(criteria)

      // then
      expect(shouldMatch).to.be.false
    })
  })

  describe('matches', () => {
    it('should not match when field is null', () => {
      // given
      const criteria = { field: null }

      // when
      const matches = selector.matches(criteria)

      // then
      expect(matches).to.be.false
    })

    it('should not match when field is undefined', () => {
      // given
      const criteria = { }

      // when
      const matches = selector.matches(criteria)

      // then
      expect(matches).to.be.false
    })
  })
})
