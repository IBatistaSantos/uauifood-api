import { ListRestaurantController } from '@/application/controllers'
import { TypeCuisine } from '@/domain/entities'
import { ListRestaurant } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ListRestaurantController', () => {
  let listRestaurantService: MockProxy<ListRestaurant>
  let sut: ListRestaurantController

  beforeAll(() => {
    listRestaurantService = mock()
    listRestaurantService.execute.mockResolvedValue([
      {
        id: '1',
        name: 'any_name',
        typeCuisine: TypeCuisine.Pizza,
        owner: {
          id: '1',
          name: 'any_owner_name',
          email: 'any_owner_email'
        }
      }
    ])
  })

  beforeEach(() => {
    sut = new ListRestaurantController(listRestaurantService)
  })

  it('should call ListRestaurantService with correct parameters', async () => {
    await sut.handle({
      restaurantId: '1'
    })

    expect(listRestaurantService.execute).toHaveBeenCalled()
    expect(listRestaurantService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if ListRestaurantService succeeds', async () => {
    const httpResponse = await sut.handle({
      restaurantId: '1'
    })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: [
        {
          id: '1',
          name: 'any_name',
          typeCuisine: TypeCuisine.Pizza,
          owner: {
            id: '1',
            name: 'any_owner_name',
            email: 'any_owner_email'
          }
        }
      ]
    })
  })
})
