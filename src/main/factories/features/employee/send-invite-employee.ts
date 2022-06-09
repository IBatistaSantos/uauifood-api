
import { SendInviteEmployeeService } from '@/data/services'
import { SendInviteEmployee } from '@/domain/features'
import { env } from '@/main/config/env'
import { makeMailerNodeMailer } from '../../infra/mailer/nodemailer'
import { makeEmployeeRepository } from '../../infra/repos/employee-repository'

import { makeUserAccountRepository } from '../../infra/repos/user-account-repository'

export const makeSendInviteEmployee = (): SendInviteEmployee => {
  return new SendInviteEmployeeService(
    makeEmployeeRepository(),
    makeUserAccountRepository(),
    makeMailerNodeMailer(),
    env.urlFrontend
  )
}
