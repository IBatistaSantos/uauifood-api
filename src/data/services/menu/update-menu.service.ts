
import { LoadMenuById, UpdateItemMenuRepository } from '@/data/contracts/repos'
import { UpdateMenu } from '@/domain/features'

export class UpdateMenuService implements UpdateMenu {
  constructor (private readonly menuRepository: LoadMenuById & UpdateItemMenuRepository) {}
  async execute (params: UpdateMenu.Params): Promise<UpdateMenu.Result> {
    const itemMenu = await this.menuRepository.loadById({
      itemId: params.itemId
    })

    if (itemMenu === undefined) {
      return new Error(`Item the menu with id ${params.itemId} not found from restaurant ${params.restaurantId}`)
    }

    const updatedMenu = await this.menuRepository.update({
      itemId: params.itemId,
      name: params.name,
      description: params.description ?? undefined,
      price: params.price
    })

    return updatedMenu ?? undefined
  }
}
