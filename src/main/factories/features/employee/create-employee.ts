
import { CreateEmployeeService } from '@/data/services'
import { CreateEmployee } from '@/domain/features'

import { makeHasherBrcypter } from '../../infra/crypto/bcrypter-hasher'
import { makeEmployeeRepository } from '../../infra/repos/employee-repository'
import { makeUserAccountRepository } from '../../infra/repos/user-account-repository'

export const makeCreateEmployee = (): CreateEmployee => {
  return new CreateEmployeeService(
    makeEmployeeRepository(),
    makeUserAccountRepository(),
    makeHasherBrcypter()
  )
}
