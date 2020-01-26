import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { until } from 'lit-html/directives/until'
import button from './components/button'
import textbox from './components/textbox'
import dropdown, { DropdownItem } from './components/dropdown'

const fallbackTextbox = textbox(({ type = 'single line' }) => (f, id, v, set) => {
  if (type === 'multi line') {
    return html`
      <textarea
        id="${id}"
        @input="${(e: Event & any) => set(e.target.value)}"
        ?required="${f.required}"
        value="${v || ''}"
      ></textarea>
    `
  }

  return html`
    <input
      id="${id}"
      type="text"
      ?required="${f.required}"
      @input="${(e: Event & any) => set(e.target.value)}"
      .value="${v || ''}"
    />
  `
})

const fallbackDropdown = dropdown(({ items = [] }) => (f, id, v, set) => {
  const optionsToRender = Promise.resolve().then(() => {
    if (typeof items === 'function') {
      return items(f)
    }

    return items
  })

  function renderOption(option: DropdownItem) {
    return html`
      <option
        value="${option.value}"
        ?selected="${option.value === v}"
        label="${option.label}"
      ></option>
    `
  }

  const optionElements = optionsToRender.then(
    resolved =>
      html`
        ${repeat(resolved, renderOption)}
      `,
  )

  return html`
    <select
      id="${id}"
      @change="${(e: Event & any) => set(e.target.value)}"
      ?required="${f.required}"
    >
      ${until(optionElements, '')}
    </select>
  `
})

const fallbackButton = button(
  ({ label, onClick }) =>
    html`
      <input type="button" .value="${label}" @click="${onClick}" />
    `,
)

export default {
  textbox: fallbackTextbox,
  dropdown: fallbackDropdown,
  button: fallbackButton,
}
