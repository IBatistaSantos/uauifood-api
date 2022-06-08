import { LoadMenuById, UpdateItemMenuRepository } from '@/data/contracts/repos'
import { UpdateMenuService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateMenuService', () => {
  let sut: UpdateMenuService
  let menuRepository: MockProxy< LoadMenuById & UpdateItemMenuRepository>

  beforeAll(() => {
    menuRepository = mock()

    menuRepository.loadById.mockResolvedValue({
      id: '1',
      name: 'Menu 1',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })
    menuRepository.update.mockResolvedValue({
      id: '1',
      name: 'Menu Updated 2',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })
  })

  beforeEach(() => {
    sut = new UpdateMenuService(menuRepository)
  })

  it('should call menuRepository.loadById with correct params', async () => {
    await sut.execute({
      itemId: 'any_item_id',
      restaurantId: 'any_restaurant_id',
      name: 'Menu Updated 2'
    })

    expect(menuRepository.loadById).toHaveBeenCalledWith({ itemId: 'any_item_id' })
    expect(menuRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return Error when menuRepository.loadById retuns null', async () => {
    menuRepository.loadById.mockResolvedValueOnce(undefined)

    const itemId = 'any_item_id'
    const restaurantId = 'any_restaurant_id'

    const result = await sut.execute({
      itemId,
      restaurantId,
      name: 'Menu Updated 2'
    })

    expect(result).toEqual(new Error(`Item the menu with id ${itemId} not found from restaurant ${restaurantId}`))
  })

  it('should call menuRepository.update with correct params', async () => {
    await sut.execute({
      itemId: 'any_item_id',
      restaurantId: 'any_restaurant_id',
      name: 'Menu Updated 2'
    })

    expect(menuRepository.update).toHaveBeenCalledWith({
      itemId: 'any_item_id',
      name: 'Menu Updated 2',
      description: undefined,
      price: undefined
    })
    expect(menuRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should returns Menu Item on success', async () => {
    const result = await sut.execute({
      itemId: 'any_item_id',
      restaurantId: 'any_restaurant_id',
      name: 'Menu Updated 2'
    })

    expect(result).toEqual({
      id: '1',
      name: 'Menu Updated 2',
      description: 'Menu 1 description',
      price: 10,
      restaurantId: '1'
    })
  })
})
