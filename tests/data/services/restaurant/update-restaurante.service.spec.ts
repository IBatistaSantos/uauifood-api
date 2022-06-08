import { LoadRestaurantByIdRepository, UpdateRestaurantRepository } from '@/data/contracts/repos'
import { UpdateRestaurantService } from '@/data/services'
import { TypeCuisine } from '@/domain/entities'
import { RestaurantNotFoundError, UpdateFailedError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateRestaurantService', () => {
  let sut: UpdateRestaurantService
  let restaurantRepository: MockProxy<LoadRestaurantByIdRepository & UpdateRestaurantRepository>

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

    restaurantRepository.update.mockResolvedValue({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      owner: {
        id: '1',
        email: 'any_owner_email',
        name: 'any_owner_name'
      }
    })
  })

  beforeEach(() => {
    sut = new UpdateRestaurantService(restaurantRepository)
  })

  it('should call restaurantRepository.loadById with correct params', async () => {
    await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })

    expect(restaurantRepository.loadById).toHaveBeenCalledWith({ id: '1' })
    expect(restaurantRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return RestaurantNotFoundError when restaurantRepository.loadById not found a restaurant', async () => {
    restaurantRepository.loadById.mockResolvedValueOnce(undefined)

    const result = await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })

    expect(result).toEqual(new RestaurantNotFoundError('1'))
  })

  it('should call restaurantRepository.update with correct params', async () => {
    await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })

    expect(restaurantRepository.update).toHaveBeenCalledWith({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })
    expect(restaurantRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should return UpdateFailedError when restaurantRepository.update retuns undefined', async () => {
    restaurantRepository.update.mockResolvedValueOnce(undefined)

    const result = await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })

    expect(result).toEqual(new UpdateFailedError('Error updating restaurant 1'))
  })

  it('should returns Restaurant on success', async () => {
    const result = await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      restaurantId: '1'
    })

    expect(result).toEqual({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Brasileira,
      owner: {
        id: '1',
        email: 'any_owner_email',
        name: 'any_owner_name'
      }
    })
  })
})
