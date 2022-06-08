import { ListRestaurant } from '@/domain/features'
import { ListRestaurantRepository } from '../contracts/repos'

export class ListRestaurantService implements ListRestaurant {
  constructor (private readonly restaurantRepository: ListRestaurantRepository) {}

  async execute (): Promise<ListRestaurant.Result> {
    const restaurant = await this.restaurantRepository.listAll({})

    return restaurant ?? []
  }
}
