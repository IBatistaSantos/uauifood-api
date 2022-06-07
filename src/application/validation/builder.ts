import { RequiredFieldValidator } from './required-fieldr'
import { Validator } from './validator'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  public static of (params: {value: any, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredFieldValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
