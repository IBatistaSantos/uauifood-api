import { ListRestaurantController } from '@/application/controllers'
import { makeListRestaurante } from '../../features/list-restaurant'

export const makeListRestaurantController = (): ListRestaurantController => {
  return new ListRestaurantController(makeListRestaurante())
}
