import { CreateMenuService } from '@/data/services'
import { CreateMenu } from '@/domain/features'
import { makeMenuRepository } from '../../infra/repos/menu-repository'

export const makeCreateMenu = (): CreateMenu => {
  return new CreateMenuService(makeMenuRepository())
}
