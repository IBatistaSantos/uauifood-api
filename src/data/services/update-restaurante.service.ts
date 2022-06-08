import { TypeCuisine } from '@/domain/entities'
import { RestaurantNotFoundError, UpdateFailedError } from '@/domain/errors'

import { UpdateRestaurant } from '@/domain/features'

import { LoadRestaurantByIdRepository, UpdateRestaurantRepository } from '../contracts/repos'

export class UpdateRestaurantService implements UpdateRestaurant {
  constructor (
    private readonly restaurantRepository: LoadRestaurantByIdRepository & UpdateRestaurantRepository
  ) {}

  async execute (params: UpdateRestaurant.Params): Promise<UpdateRestaurant.Result> {
    const { name, typeCuisine, restaurantId } = params

    const restaurant = await this.restaurantRepository.loadById({ id: restaurantId })

    if (restaurant === undefined) {
      return new RestaurantNotFoundError(restaurantId)
    }

    const newRestaurant = await this.restaurantRepository.update({
      name,
      typeCuisine,
      restaurantId
    })

    if (newRestaurant === undefined) {
      return new UpdateFailedError(`Error updating restaurant ${restaurantId}`)
    }

    return {
      id: newRestaurant.id,
      name: newRestaurant.name,
      typeCuisine: newRestaurant.typeCuisine as TypeCuisine,
      owner: {
        id: newRestaurant.owner.id,
        name: newRestaurant.owner.name,
        email: newRestaurant.owner.email
      }
    }
  }
}
