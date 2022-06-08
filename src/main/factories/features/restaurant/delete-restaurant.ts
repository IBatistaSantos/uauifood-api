import { DeleteRestaurantService } from '@/data/services'
import { DeleteRestaurant } from '@/domain/features'
import { makeRestaurantRepository } from '../../infra/repos/restaurant-repository'

export const makeDeleteRestaurant = (): DeleteRestaurant => {
  return new DeleteRestaurantService(
    makeRestaurantRepository()
  )
}
