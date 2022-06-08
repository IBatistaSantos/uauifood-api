import { AuthenticationController } from '@/application/controllers'

import { Authentication } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('AuthenticationController', () => {
  let authenticationService: MockProxy<Authentication>
  let sut: AuthenticationController

  beforeAll(() => {
    authenticationService = mock()
    authenticationService.execute.mockResolvedValue({
      accessToken: 'any_token',
      user: {
        id: '1',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }

    })
  })

  beforeEach(() => {
    sut = new AuthenticationController(authenticationService)
  })

  it('should call AuthenticationService with correct parameters', async () => {
    await sut.handle({
      email: 'any_email',
      password: 'any_password'
    })

    expect(authenticationService.execute).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password'
    })
    expect(authenticationService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if CreateRestaurantService succeeds', async () => {
    const httpResponse = await sut.handle({
      email: 'any_email',
      password: 'any_password'
    })
    expect(httpResponse).toEqual({

      statusCode: 200,
      data: {
        accessToken: 'any_token',
        user: {
          id: '1',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password'
        }
      }

    })
  })
})
