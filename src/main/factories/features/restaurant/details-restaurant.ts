
import { DetailsRestaurantService } from '@/data/services'
import { DetailsRestaurant } from '@/domain/features'

import { makeRestaurantRepository } from '../../infra/repos/restaurant-repository'

export const makeDetailsRestaurante = (): DetailsRestaurant => {
  return new DetailsRestaurantService(
    makeRestaurantRepository()
  )
}
