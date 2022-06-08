import { DeleteRestaurantController } from '@/application/controllers'
import { makeDeleteRestaurant } from '@/main/factories/features'

export const makeDeleteRestaurantController = (): DeleteRestaurantController => {
  const deleteRestaurantController = new DeleteRestaurantController(makeDeleteRestaurant())
  return deleteRestaurantController
}
