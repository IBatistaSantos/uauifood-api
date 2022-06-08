import { ListRestaurantController } from '@/application/controllers'
import { makeListRestaurante } from '@/main/factories/features'

export const makeListRestaurantController = (): ListRestaurantController => {
  return new ListRestaurantController(makeListRestaurante())
}
