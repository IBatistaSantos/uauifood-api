import { GetMenuController } from '@/application/controllers'
import { makeGetMenu } from '../../features/get-menu'

export const makeGetMenuController = (): GetMenuController => {
  return new GetMenuController(makeGetMenu())
}
