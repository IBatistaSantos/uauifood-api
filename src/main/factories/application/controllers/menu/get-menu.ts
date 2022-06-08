import { GetMenuController } from '@/application/controllers'
import { makeGetMenu } from '@/main/factories/features'

export const makeGetMenuController = (): GetMenuController => {
  return new GetMenuController(makeGetMenu())
}
