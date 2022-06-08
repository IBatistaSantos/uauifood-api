
import { ProfileUserService } from '@/data/services'
import { ProfileUser } from '@/domain/features'

import { makeUserAccountRepository } from '../../infra/repos/user-account-repository'

export const makeProfileUser = (): ProfileUser => {
  return new ProfileUserService(
    makeUserAccountRepository()
  )
}
