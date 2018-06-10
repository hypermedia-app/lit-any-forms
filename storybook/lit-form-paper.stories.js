import { html } from 'lit-html/lib/lit-extended';
import { storiesOf } from '@storybook/polymer/dist/client';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { FieldTemplates } from '../src';
import { contract, showLabels } from './knobs';
import notes from './notes/custom-elements.md';
import onSubmit from './helpers/submit-handler';

import '../bower_components/paper-input/paper-input.html';

storiesOf('lit-form', module)
    .add('custom fields', withMarkdownNotes(notes)(() => {
        FieldTemplates.byName('custom-fields')
            .when
            .fieldMatches(f => f.type === 'integer')
            .renders((f, id, v, set) =>
                html`<paper-input id=${id} 
                        type=number
                        label=${f.title}
                        value=${v} 
                        on-change=${e => set(Number.parseInt(e.target.value, 0))}></paper-input>`);

        const c = {
            fields: [
                {
                    property: 'age',
                    title: 'Your age',
                    type: 'integer',
                },
            ],
        };

        return html`<lit-form
                          noLabels="${!showLabels(false)}"
                          contract="${contract(c)}"
                          template-registry="custom-fields"
                          on-submit="${onSubmit}"></lit-form>`;
    }));
