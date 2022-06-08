import { GetMenuService } from '@/data/services'
import { GetMenu } from '@/domain/features'
import { makeMenuRepository } from '../infra/repos/menu-repository'

export const makeGetMenu = (): GetMenu => {
  return new GetMenuService(makeMenuRepository())
}
