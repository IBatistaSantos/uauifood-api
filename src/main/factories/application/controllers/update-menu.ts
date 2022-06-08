import { UpdateMenuController } from '@/application/controllers'
import { makeUpdateMenu } from '../../features/update-menu'

export const makeUpdateMenuController = (): UpdateMenuController => {
  return new UpdateMenuController(makeUpdateMenu())
}
