// @ts-ignore
import { expect } from '@open-wc/testing'
import { FieldTemplates } from '../index'

describe('FieldTemplates', () => {
    describe('when builder is created', () => {
        let builder

        beforeEach(() => {
            builder = FieldTemplates.default.when
        })

        it('should create builder for matching field', () => {
            expect(builder.fieldMatches).to.be.ok
        })
    })
})
