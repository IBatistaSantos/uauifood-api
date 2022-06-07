import { RequiredFieldValidator, ValidationBuilder } from '@/application/validation'

describe('ValidationBuilder', () => {
  it('should return a RequiredFieldValidator', () => {
    const validators = ValidationBuilder
      .of({ value: 'any_field', fieldName: 'any_name' })
      .required()
      .build()

    expect(validators).toEqual([new RequiredFieldValidator('any_field', 'any_name')])
  })
})
