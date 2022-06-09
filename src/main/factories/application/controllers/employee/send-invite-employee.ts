import { SendInviteController } from '@/application/controllers'
import { makeSendInviteEmployee } from '@/main/factories/features'

export const makeSendInviteController = (): SendInviteController => {
  return new SendInviteController(makeSendInviteEmployee())
}
