import { DeleteRestaurantController } from '@/application/controllers'
import { DeleteRestaurant } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteRestaurantController', () => {
  let deleteRestaurantService: MockProxy<DeleteRestaurant>
  let sut: DeleteRestaurantController

  beforeAll(() => {
    deleteRestaurantService = mock()
    deleteRestaurantService.execute.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new DeleteRestaurantController(deleteRestaurantService)
  })

  it('should call DetailsRestaurantService with correct parameters', async () => {
    await sut.handle({
      restaurantId: '1'
    })

    expect(deleteRestaurantService.execute).toHaveBeenCalledWith({
      restaurantId: '1'
    })
    expect(deleteRestaurantService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if DeleteRestaurantService succeeds', async () => {
    const httpResponse = await sut.handle({
      restaurantId: '1'
    })
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        message: 'Restaurant deleted successfully'
      }
    })
  })
})
