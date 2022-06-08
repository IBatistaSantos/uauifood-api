
import { OptionalFieldError } from '../errors'

export class OptionalFieldValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value !== undefined) {
      if (this.value === '' || this.value === undefined || this.value === null) {
        return new OptionalFieldError(this.fieldName)
      }
    }
  }
}
