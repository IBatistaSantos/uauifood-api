import { LoadMenuByNAmeAndRestaurantId, SaveMenuRepository } from '@/data/contracts/repos'
import { CreateMenuService } from '@/data/services'
import { MenuAlreadyExistsError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateMenuService', () => {
  let sut: CreateMenuService
  let menuRepository: MockProxy<LoadMenuByNAmeAndRestaurantId & SaveMenuRepository>

  beforeAll(() => {
    menuRepository = mock()

    menuRepository.loadByNameAndRestaurantId.mockResolvedValue(undefined)
    menuRepository.save.mockResolvedValue({
      id: '1',
      name: 'Menu 1',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })
  })

  beforeEach(() => {
    sut = new CreateMenuService(menuRepository)
  })

  it('should call menuRepository.loadByNameAndRestaurantId with correct params', async () => {
    await sut.execute({
      description: 'Menu 1 description',
      name: 'Menu 1',
      price: 10,
      restaurantId: '1'
    })

    expect(menuRepository.loadByNameAndRestaurantId).toHaveBeenCalledWith({ name: 'Menu 1', restaurantId: '1' })
    expect(menuRepository.loadByNameAndRestaurantId).toHaveBeenCalledTimes(1)
  })

  it('should return MenuAlreadyExistsError when menuRepository.loadByNameAndRestaurantId retuns a item menu', async () => {
    menuRepository.loadByNameAndRestaurantId.mockResolvedValueOnce({
      id: '1',
      name: 'Menu 1',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })

    const result = await sut.execute({
      description: 'Menu 1 description',
      name: 'any_name_item',
      price: 10,
      restaurantId: 'any_restaurant_id'
    })

    expect(result).toEqual(new MenuAlreadyExistsError('any_name_item', 'any_restaurant_id'))
  })

  it('should call menuRepository.save with correct params', async () => {
    await sut.execute({
      description: 'Menu 1 description',
      name: 'any_name_item',
      price: 10,
      restaurantId: 'any_restaurant_id'
    })

    expect(menuRepository.save).toHaveBeenCalledWith({
      description: 'Menu 1 description',
      name: 'any_name_item',
      price: 10,
      restaurantId: 'any_restaurant_id'
    })
    expect(menuRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should returns Menu Item on success', async () => {
    const result = await sut.execute({
      description: 'Menu 1 description',
      name: 'any_name_item',
      price: 10,
      restaurantId: 'any_restaurant_id'
    })

    expect(result).toEqual({
      id: '1',
      name: 'Menu 1',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })
  })
})
