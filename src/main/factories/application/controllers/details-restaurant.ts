import { DetailsRestaurantController } from '@/application/controllers'
import { makeDetailsRestaurante } from '../../features/details-restaurant'

export const makeDetailsRestaurantController = (): DetailsRestaurantController => {
  return new DetailsRestaurantController(makeDetailsRestaurante())
}
