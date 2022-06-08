import { ListRestaurantRepository } from '@/data/contracts/repos'
import { ListRestaurantService } from '@/data/services'
import { TypeCuisine } from '@/domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

describe('ListRestaurantService', () => {
  let sut: ListRestaurantService
  let restaurantRepository: MockProxy<ListRestaurantRepository>

  beforeAll(() => {
    restaurantRepository = mock()

    restaurantRepository.listAll.mockResolvedValue([{
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        id: '1',
        name: 'any_name_owner',
        email: 'any_email_owner'
      }
    }])
  })

  beforeEach(() => {
    sut = new ListRestaurantService(restaurantRepository)
  })

  it('should call restaurantRepository.listAll with correct params', async () => {
    await sut.execute()

    expect(restaurantRepository.listAll).toHaveBeenCalledWith({})
    expect(restaurantRepository.listAll).toHaveBeenCalledTimes(1)
  })

  it('should returns Restaurants on success', async () => {
    const result = await sut.execute()

    expect(result).toEqual([
      {
        id: '1',
        name: 'any_name_restaurant',
        typeCuisine: TypeCuisine.Pizza,
        owner: {
          id: '1',
          name: 'any_name_owner',
          email: 'any_email_owner'
        }
      }
    ])
  })
})
