import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import {} from '../'
import {
  makeCreateMenuController,
  makeGetMenuController,
  makeUpdateMenuController,
  makeDeleteMenuController
} from '../factories/application/controllers'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.post('/restaurant/:restaurantId/menu', auth, adapt((makeCreateMenuController())))
  router.get('/restaurant/:restaurantId/menu', auth, adapt((makeGetMenuController())))
  router.put('/restaurant/:restaurantId/menu/:itemId', auth, adapt((makeUpdateMenuController())))
  router.delete('/restaurant/:restaurantId/menu/:itemId', auth, adapt((makeDeleteMenuController())))
}
