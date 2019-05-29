/* global describe, it, beforeEach */
import { expect } from '@open-wc/testing';
import ViewTemplateSelectorBuilder from '@lit-any/lit-any/views/TemplateSelectorBuilder';
import FieldTemplateSelectorBuilder from '@lit-any/lit-any/forms/TemplateSelectorBuilder';
import * as sinon from 'sinon';

describe('FieldTemplateSelectorBuilder', () => {
    let builder;

    beforeEach(() => {
        builder = new FieldTemplateSelectorBuilder({});
    });

    describe('adding field matcher function', () => {
        it('creates a matcher', () => {
            // given
            const field = {};
            const matchFunc = sinon.stub().returns(true);

            // when
            builder.fieldMatches(matchFunc);

            // then
            const matcher = builder._selector._matchers[0];
            expect(matcher({ field })).to.be.true;
            expect(matchFunc.firstCall.args[0]).to.be.equal(field);
        });
    });
});
