import FormTemplateRegistry from './TemplateRegistry'

const fieldTemplates: Map<string, FormTemplateRegistry> = new Map()

export default function createRegistry(name = ''): FormTemplateRegistry {
  let registry = fieldTemplates.get(name)

  if (!registry) {
    registry = new FormTemplateRegistry(name)
    fieldTemplates.set(name, registry)
  }

  return registry
}
