import { RequiredFieldError } from '@/application/errors'
import { RequiredFieldValidator } from '@/application/validation'

describe('RequiredFieldValidator', () => {
  it('should return RequiredFieldError if value is null', () => {
    const sut = new RequiredFieldValidator(null as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredFieldValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', () => {
    const sut = new RequiredFieldValidator('any_value', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
