import { DeleteRestaurant } from '@/domain/features'
import { DeleteRestaurantByIdRepository } from '../../contracts/repos'

export class DeleteRestaurantService implements DeleteRestaurant {
  constructor (private readonly restaurantRepository: DeleteRestaurantByIdRepository) {}

  async execute (params: DeleteRestaurant.Params): Promise<void> {
    const { restaurantId } = params

    await this.restaurantRepository.delete({ restaurantId })
  }
}
