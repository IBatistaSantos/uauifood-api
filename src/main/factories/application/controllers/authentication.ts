import { AuthenticationController } from '@/application/controllers'
import { makeAuthentication } from '../../features/authentication'

export const makeAuthenticationController = (): AuthenticationController => {
  return new AuthenticationController(makeAuthentication())
}
