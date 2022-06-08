import { DeleteRestaurantController } from '@/application/controllers'
import { makeDeleteRestaurant } from '../../features/delete-restaurant'

export const makeDeleteRestaurantController = (): DeleteRestaurantController => {
  const deleteRestaurantController = new DeleteRestaurantController(makeDeleteRestaurant())
  return deleteRestaurantController
}
