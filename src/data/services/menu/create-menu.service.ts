import { LoadMenuByNAmeAndRestaurantId, SaveMenuRepository } from '@/data/contracts/repos'
import { MenuAlreadyExistsError } from '@/domain/errors'
import { CreateMenu } from '@/domain/features'

export class CreateMenuService implements CreateMenu {
  constructor (private readonly menuRepository: LoadMenuByNAmeAndRestaurantId & SaveMenuRepository) {}
  async execute (params: CreateMenu.Params): Promise<CreateMenu.Result> {
    const menuAlreadyExists = await this.menuRepository.loadByNameAndRestaurantId({
      name: params.name,
      restaurantId: params.restaurantId
    })

    if (menuAlreadyExists !== undefined) {
      return new MenuAlreadyExistsError(params.name, params.restaurantId)
    }

    const newMenu = await this.menuRepository.save({
      name: params.name,
      description: params.description ?? undefined,
      price: params.price,
      restaurantId: params.restaurantId
    })

    if (newMenu === undefined) {
      return new Error('Error creating menu')
    }

    return newMenu
  }
}
