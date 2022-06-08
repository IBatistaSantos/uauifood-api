import { DeleteMenuService } from '@/data/services'
import { DeleteMenu } from '@/domain/features'
import { makeMenuRepository } from '../infra/repos/menu-repository'

export const makeDeleteMenu = (): DeleteMenu => {
  return new DeleteMenuService(makeMenuRepository())
}
