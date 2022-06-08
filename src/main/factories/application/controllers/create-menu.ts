import { CreateMenuController } from '@/application/controllers'
import { makeCreateMenu } from '../../features/create-menu'

export const makeCreateMenuController = (): CreateMenuController => {
  return new CreateMenuController(makeCreateMenu())
}
