import { DeleteItemMenuRepository, LoadMenuById } from '@/data/contracts/repos'
import { DeleteMenuService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('DeleteMenuService', () => {
  let sut: DeleteMenuService
  let menuRepository: MockProxy<LoadMenuById & DeleteItemMenuRepository>

  beforeAll(() => {
    menuRepository = mock()

    menuRepository.delete.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new DeleteMenuService(menuRepository)
  })

  it('should call menuRepository.delete with correct params', async () => {
    await sut.execute({
      itemId: 'any_item_id',
      restaurantId: 'any_restaurant_id'
    })

    expect(menuRepository.delete).toHaveBeenCalledWith({ itemId: 'any_item_id' })
    expect(menuRepository.delete).toHaveBeenCalledTimes(1)
  })
})
