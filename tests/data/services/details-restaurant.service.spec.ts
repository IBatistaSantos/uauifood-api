import { LoadRestaurantByIdRepository } from '@/data/contracts/repos'
import { DetailsRestaurantService } from '@/data/services'
import { TypeCuisine } from '@/domain/entities'
import { RestaurantNotFoundError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('DetailsRestaurantService', () => {
  let sut: DetailsRestaurantService
  let restaurantRepository: MockProxy<LoadRestaurantByIdRepository>

  beforeAll(() => {
    restaurantRepository = mock()

    restaurantRepository.loadById.mockResolvedValue({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      ownerId: '1',
      owner: {
        id: '1',
        name: 'any_name_owner',
        email: 'any_email_owner'
      }
    })
  })

  beforeEach(() => {
    sut = new DetailsRestaurantService(restaurantRepository)
  })

  it('should call restaurantRepository.loadById with correct params', async () => {
    await sut.execute({
      restaurantId: '1'
    })

    expect(restaurantRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(restaurantRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return RestaurantNotFoundError when restaurantRepository.loadById not found a restaurant', async () => {
    restaurantRepository.loadById.mockResolvedValueOnce(undefined)

    const result = await sut.execute({
      restaurantId: '1'
    })

    expect(result).toEqual(new RestaurantNotFoundError('1'))
  })

  it('should returns Restaurant on success', async () => {
    const result = await sut.execute({
      restaurantId: '1'
    })

    expect(result).toEqual({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        id: '1',
        name: 'any_name_owner',
        email: 'any_email_owner'
      }
    })
  })
})
