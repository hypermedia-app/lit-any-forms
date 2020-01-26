import LitForm from '../src/lit-form'

export function pEvent(element: any, event: string): Promise<CustomEvent> {
  return new Promise(resolve => {
    element.addEventListener(event, resolve)
  })
}

export function forSubmit(litForm: LitForm): Promise<CustomEvent> {
  return pEvent(litForm, 'submit')
}
