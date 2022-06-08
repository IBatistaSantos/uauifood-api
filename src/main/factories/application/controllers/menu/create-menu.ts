import { CreateMenuController } from '@/application/controllers'
import { makeCreateMenu } from '@/main/factories/features/menu/create-menu'

export const makeCreateMenuController = (): CreateMenuController => {
  return new CreateMenuController(makeCreateMenu())
}
