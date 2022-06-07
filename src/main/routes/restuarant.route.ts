import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'

import { makeCreateRestaurantController } from '../factories/application/controllers/average-calculation'

export default (router: Router): void => {
  router.post('/restaurant', adapt((makeCreateRestaurantController())))
}
