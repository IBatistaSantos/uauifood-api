import { CreateRestaurantController } from '@/application/controllers'
import { makeCreateRestaurante } from '@/main/factories/features/create-restaurant'

export const makeCreateRestaurantController = (): CreateRestaurantController => {
  return new CreateRestaurantController(makeCreateRestaurante())
}
