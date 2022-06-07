
import { AuthenticationService } from '@/data/services'
import { Authentication } from '@/domain/features'
import { makeHasherBrcypter } from '../infra/crypto/bcrypter-hasher'
import { makejwtAdapter } from '../infra/crypto/jwt-adapter'

import { makeUserAccountRepository } from '../infra/repos/user-account-repository'

export const makeAuthentication = (): Authentication => {
  return new AuthenticationService(
    makeUserAccountRepository(),
    makeHasherBrcypter(),
    makejwtAdapter()
  )
}
