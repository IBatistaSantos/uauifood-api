import { UpdateRestaurantController } from '@/application/controllers'
import { makeUpdateRestaurante } from '@/main/factories/features/update-restaurant'

export const makeUpdateRestaurantController = (): UpdateRestaurantController => {
  return new UpdateRestaurantController(makeUpdateRestaurante())
}
