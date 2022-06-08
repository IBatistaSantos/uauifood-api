import { DeleteMenuController } from '@/application/controllers'
import { makeDeleteMenu } from '../../features/delete-menu'

export const makeDeleteMenuController = (): DeleteMenuController => {
  return new DeleteMenuController(makeDeleteMenu())
}
