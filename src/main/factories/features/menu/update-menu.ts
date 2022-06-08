import { UpdateMenuService } from '@/data/services'
import { UpdateMenu } from '@/domain/features'
import { makeMenuRepository } from '../../infra/repos/menu-repository'

export const makeUpdateMenu = (): UpdateMenu => {
  return new UpdateMenuService(makeMenuRepository())
}
