
import { LoadMenuByRestaurantId } from '@/data/contracts/repos'
import { GetMenu } from '@/domain/features'

export class GetMenuService implements GetMenu {
  constructor (private readonly menuRepository: LoadMenuByRestaurantId) {}
  async execute (params: GetMenu.Params): Promise<GetMenu.Result> {
    const menu = await this.menuRepository.loadByRestaurantId({
      restaurantId: params.restaurantId
    })

    if (menu === undefined) {
      return new Error(`Menu not found from restaurant ${params.restaurantId}`)
    }

    return menu
  }
}
