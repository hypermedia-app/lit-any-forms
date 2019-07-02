import TemplateSelector from '@lit-any/core/template-registry/TemplateSelector'
import { Criteria } from './index'

export default class FieldTemplateSelector extends TemplateSelector<Criteria> {
  // eslint-disable-next-line class-methods-use-this
  public shouldMatch(criteria: Criteria) {
    return (
      typeof criteria.field !== 'undefined' &&
      criteria.field !== null &&
      typeof criteria.field.property !== 'undefined' &&
      criteria.field.property !== null
    )
  }
}
