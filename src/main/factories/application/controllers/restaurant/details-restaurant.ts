import { DetailsRestaurantController } from '@/application/controllers'
import { makeDetailsRestaurante } from '@/main/factories/features'

export const makeDetailsRestaurantController = (): DetailsRestaurantController => {
  return new DetailsRestaurantController(makeDetailsRestaurante())
}
