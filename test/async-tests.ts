import LitForm from '../src/lit-form'

export function pEvent(element: HTMLElement, event: string): Promise<CustomEvent> {
  return new Promise(resolve => {
    // @ts-ignore
    element.addEventListener(event, resolve)
  })
}

export function forSubmit(litForm: LitForm): Promise<CustomEvent> {
  return pEvent(litForm, 'submit')
}
