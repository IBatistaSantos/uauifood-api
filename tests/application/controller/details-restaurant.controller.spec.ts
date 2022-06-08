import { DetailsRestaurantController } from '@/application/controllers'
import { TypeCuisine } from '@/domain/entities'
import { DetailsRestaurant } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DetailsRestaurantController', () => {
  let detailsRestaurantService: MockProxy<DetailsRestaurant>
  let sut: DetailsRestaurantController

  beforeAll(() => {
    detailsRestaurantService = mock()
    detailsRestaurantService.execute.mockResolvedValue({
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
    sut = new DetailsRestaurantController(detailsRestaurantService)
  })

  it('should call DetailsRestaurantService with correct parameters', async () => {
    await sut.handle({
      restaurantId: '1'
    })

    expect(detailsRestaurantService.execute).toHaveBeenCalledWith({
      restaurantId: '1'
    })
    expect(detailsRestaurantService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if DetailsRestaurantService succeeds', async () => {
    const httpResponse = await sut.handle({
      restaurantId: '1'
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
