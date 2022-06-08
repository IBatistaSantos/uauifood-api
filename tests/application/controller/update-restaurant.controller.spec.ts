import { UpdateRestaurantController } from '@/application/controllers'
import { TypeCuisine } from '@/domain/entities'
import { UpdateRestaurant } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateRestaurantController', () => {
  let updateRestaurantService: MockProxy<UpdateRestaurant>
  let sut: UpdateRestaurantController

  beforeAll(() => {
    updateRestaurantService = mock()
    updateRestaurantService.execute.mockResolvedValue({
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
    sut = new UpdateRestaurantController(updateRestaurantService)
  })

  it('should call UpdateRestaurantService with correct parameters', async () => {
    await sut.handle({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza
    })

    expect(updateRestaurantService.execute).toHaveBeenCalledWith({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza
    })
    expect(updateRestaurantService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if UpdateRestaurantService succeeds', async () => {
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
