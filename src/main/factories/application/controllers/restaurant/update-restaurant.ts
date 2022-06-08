import { UpdateRestaurantController } from '@/application/controllers'
import { makeUpdateRestaurante } from '@/main/factories/features'

export const makeUpdateRestaurantController = (): UpdateRestaurantController => {
  return new UpdateRestaurantController(makeUpdateRestaurante())
}
