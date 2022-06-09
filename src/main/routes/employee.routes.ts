import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { makeCreateEmployeeController, makeSendInviteController } from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/restaurant/:restaurantId/employee/invite', auth, adapt((makeSendInviteController())))
  router.post('/restaurant/:restaurantId/employee', auth, adapt((makeCreateEmployeeController())))
}
