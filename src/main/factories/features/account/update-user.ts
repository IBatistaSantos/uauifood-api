
import { UpdateUserService } from '@/data/services'
import { UpdateUser } from '@/domain/features'
import { makeHasherBrcypter } from '../../infra/crypto/bcrypter-hasher'

import { makeUserAccountRepository } from '../../infra/repos/user-account-repository'

export const makeUpdateAccount = (): UpdateUser => {
  return new UpdateUserService(
    makeUserAccountRepository(),
    makeHasherBrcypter()
  )
}
