import { DeleteMenuController } from '@/application/controllers'
import { makeDeleteMenu } from '@/main/factories/features'

export const makeDeleteMenuController = (): DeleteMenuController => {
  return new DeleteMenuController(makeDeleteMenu())
}
