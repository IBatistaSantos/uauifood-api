
import { ListRestaurantService } from '@/data/services'
import { ListRestaurant } from '@/domain/features'

import { makeRestaurantRepository } from '../../infra/repos/restaurant-repository'

export const makeListRestaurante = (): ListRestaurant => {
  return new ListRestaurantService(
    makeRestaurantRepository()
  )
}
