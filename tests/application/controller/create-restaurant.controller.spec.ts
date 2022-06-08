import { CreateRestaurantController } from '@/application/controllers'
import { TypeCuisine } from '@/domain/entities'
import { CreateRestaurant } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateRestaurantController', () => {
  let createRestaurantService: MockProxy<CreateRestaurant>
  let sut: CreateRestaurantController

  beforeAll(() => {
    createRestaurantService = mock()
    createRestaurantService.execute.mockResolvedValue({
      id: '1',
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        id: '1',
        name: 'any_owner_name',
        email: 'any_owner_email'
      }
    })
  })

  beforeEach(() => {
    sut = new CreateRestaurantController(createRestaurantService)
  })

  it('should call CreateRestaurantService with correct parameters', async () => {
    await sut.handle({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        name: 'any_owner_name',
        email: 'any_owner_email',
        password: 'any_password'
      }
    })

    expect(createRestaurantService.execute).toHaveBeenCalledWith({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        name: 'any_owner_name',
        email: 'any_owner_email',
        password: 'any_password'
      }
    })
    expect(createRestaurantService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if CreateRestaurantService succeeds', async () => {
    const httpResponse = await sut.handle({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        name: 'any_owner_name',
        email: 'any_owner_email',
        password: 'any_password'
      }
    })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: '1',
        name: 'any_name',
        typeCuisine: TypeCuisine.Pizza,
        owner: {
          id: '1',
          name: 'any_owner_name',
          email: 'any_owner_email'
        }
      }
    })
  })
})
