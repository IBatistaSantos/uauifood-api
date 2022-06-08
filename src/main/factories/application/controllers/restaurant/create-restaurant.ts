import { CreateRestaurantController } from '@/application/controllers'
import { makeCreateRestaurante } from '@/main/factories/features/restaurant/create-restaurant'

export const makeCreateRestaurantController = (): CreateRestaurantController => {
  return new CreateRestaurantController(makeCreateRestaurante())
}
