import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { makeProfileController, makeUpdateUserController } from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.put('/account', auth, adapt((makeUpdateUserController())))
  router.get('/account/me', auth, adapt((makeProfileController())))
}
