import { UpdateUserAccountController } from '@/application/controllers'
import { makeUpdateAccount } from '../../../features'

export const makeUpdateUserController = (): UpdateUserAccountController => {
  return new UpdateUserAccountController(makeUpdateAccount())
}
