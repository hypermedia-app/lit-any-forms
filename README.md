# `@lit-any/forms` [![codecov](https://codecov.io/gh/hypermedia-app/lit-any-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/wikibus/lit-any)

Construct HTML forms from lightweight snippets for each field using `lit-html`

## Installation

``` bash
yarn add @lit-any/forms
```

## Form setup

First you have to define a contract which will drive the form's appearance and functionality.

```js
const contract = {
  fields: [{
    title: 'Age',
    property: 'age',
    type: 'http://www.w3.org/2001/XMLSchema#integer'
  }]
}
```

The contract will be used on a `lit-form` element to create an interactive form:

```html
<lit-form .contract=${contract}
          submit-button-label="Register"
          @submit=${submitModel}></lit-form>
```

When the `Register` button is clicked `submitModel` will be called where the code will retrieve the form's
value from `event.detail.value`.

```js
function submitModel(e) {
  // submit lit-form's value
  fetch(e.detail.target, {
    method: e.detail.method,
    body: e.detail.value,
  })
}
```

The above is not enough to build a rich, convincing user experience as the form
does not know how to receive the user's input. A plain `<input type="text">` will be
rendered.

## Field setup

There are two ways for influencing the appearance of individual form input fields.

### Pre-built component sets

The recommended way is to use a component to go with each field. Those components are imported
as sets of elements which share design features and look & feel. Currently there are two such 
component sets being worked on:

* Material design using Paper Elements: [`@lit-any/components-paper-elements`](https://github.com/hypermedia-app/lit-any-components-paper-elements)
* Vaadin components: [`@lit-any/components-vaadin`](https://github.com/hypermedia-app/lit-any-components-vaadin)

The snippet below would be used to render a Vaadin text input for the age property used above

```js
import { FieldTemplates } from '@lit-any/forms'
import { textbox } from '@lit-any/forms/components'
import vaadin from '@lit-any/components-vaadin'

// register Vaadin components to be used
FieldTemplates.default.useComponents(vaadin)

// render textbox when type in xds:integer
FieldTemplates.default.when
  .fieldMatches(field => field.type === 'http://www.w3.org/2001/XMLSchema#integer')
  .renders(textbox({
    type: 'single line',
  }))
```

### Custom form fields

Alternatively the element's template can be handcrafted:

```js
import { FieldTemplates } from '@lit-any/forms'

FieldTemplates.default.when
  .fieldMatches(field => field.type === 'http://www.w3.org/2001/XMLSchema#integer')
  .renders((field, id, value, set) => {
    return html`<input type=number value=${value} id=${id}
                       @change=${e => set(Number.parseInt(e.target.value, 0))}>`
  })
```

The `field` parameter is the description from the contract.

The `id` is unique id which can be set to the field.

The `value` is the initial value, if any. Setting it back will have no effect.

The `set` parameter is a function used to set tha value
back to the form's model and has to be bound to the input control.
