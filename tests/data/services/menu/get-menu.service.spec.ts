import { LoadMenuByRestaurantId } from '@/data/contracts/repos'
import { GetMenuService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('GetMenuService', () => {
  let sut: GetMenuService
  let menuRepository: MockProxy<LoadMenuByRestaurantId>

  beforeAll(() => {
    menuRepository = mock()

    menuRepository.loadByRestaurantId.mockResolvedValue([
      {
        id: 'any_id',
        name: 'Menu 1',
        description: 'Menu 1 description',
        price: 10,
        restaurantId: '1',
        restaurant: {
          id: 'any_restaurant_1',
          name: 'Restaurant 1'
        }
      }
    ])
  })

  beforeEach(() => {
    sut = new GetMenuService(menuRepository)
  })

  it('should call menuRepository.loadByRestaurantId with correct params', async () => {
    await sut.execute({
      restaurantId: 'any_restaurant_id'
    })

    expect(menuRepository.loadByRestaurantId).toHaveBeenCalledWith({ restaurantId: 'any_restaurant_id' })
    expect(menuRepository.loadByRestaurantId).toHaveBeenCalledTimes(1)
  })

  it('should return Error when menuRepository.loadByRestaurantId returs undefined', async () => {
    menuRepository.loadByRestaurantId.mockResolvedValueOnce(undefined)
    const restaurantId = 'any_restaurant_id'
    const result = await sut.execute({ restaurantId })

    expect(result).toEqual(new Error(`Menu not found from restaurant ${restaurantId}`))
  })

  it('should return a list of menus', async () => {
    const result = await sut.execute({
      restaurantId: 'any_restaurant_id'
    })

    expect(result).toEqual([
      {
        id: 'any_id',
        name: 'Menu 1',
        description: 'Menu 1 description',
        price: 10,
        restaurantId: '1',
        restaurant: {
          id: 'any_restaurant_1',
          name: 'Restaurant 1'
        }
      }
    ])
  })
})
