import { TypeCuisine } from '@/domain/entities'
import { RestaurantNotFoundError } from '@/domain/errors'
import { DetailsRestaurant } from '@/domain/features'
import { LoadRestaurantByIdRepository } from '../../contracts/repos'

export class DetailsRestaurantService implements DetailsRestaurant {
  constructor (private readonly restaurantRepository: LoadRestaurantByIdRepository) {}

  async execute (params: DetailsRestaurant.Params): Promise<DetailsRestaurant.Result> {
    const { restaurantId } = params

    const restaurant = await this.restaurantRepository.loadById({ id: restaurantId })

    if (restaurant === undefined) {
      return new RestaurantNotFoundError(restaurantId)
    }

    return {
      id: restaurant.id,
      name: restaurant.name,
      typeCuisine: restaurant.typeCuisine as TypeCuisine,
      owner: {
        id: restaurant.owner.id,
        name: restaurant.owner.name,
        email: restaurant.owner.email
      }

    }
  }
}
