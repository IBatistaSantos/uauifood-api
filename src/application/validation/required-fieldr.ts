
import { RequiredFieldError } from '../errors'

export class RequiredFieldValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === '' || this.value === undefined || this.value === null) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
