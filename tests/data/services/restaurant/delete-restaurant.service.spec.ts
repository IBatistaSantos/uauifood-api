import { DeleteRestaurantByIdRepository } from '@/data/contracts/repos'
import { DeleteRestaurantService } from '@/data/services'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteRestaurantService', () => {
  let sut: DeleteRestaurantService
  let restaurantRepository: MockProxy<DeleteRestaurantByIdRepository>

  beforeAll(() => {
    restaurantRepository = mock()

    restaurantRepository.delete.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new DeleteRestaurantService(restaurantRepository)
  })

  it('should call restaurantRepository.loadById with correct params', async () => {
    await sut.execute({
      restaurantId: '1'
    })

    expect(restaurantRepository.delete).toHaveBeenCalledWith({ itemId: '1' })
    expect(restaurantRepository.delete).toHaveBeenCalledTimes(1)
  })
})
