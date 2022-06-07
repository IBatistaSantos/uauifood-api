import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { makeAuthenticationController } from '../factories/application/controllers'

export default (router: Router): void => {
  router.post('/auth', adapt((makeAuthenticationController())))
}
