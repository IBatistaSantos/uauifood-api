import { UpdateMenuController } from '@/application/controllers'
import { makeUpdateMenu } from '@/main/factories/features'

export const makeUpdateMenuController = (): UpdateMenuController => {
  return new UpdateMenuController(makeUpdateMenu())
}
