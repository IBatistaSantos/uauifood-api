
import { UpdateRestaurantService } from '@/data/services'
import { UpdateRestaurant } from '@/domain/features'

import { makeRestaurantRepository } from '../../infra/repos/restaurant-repository'

export const makeUpdateRestaurante = (): UpdateRestaurant => {
  return new UpdateRestaurantService(
    makeRestaurantRepository()
  )
}
