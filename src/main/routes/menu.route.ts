import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import {} from '../'
import {
  makeCreateMenuController,
  makeGetMenuController,
  makeUpdateMenuController,
  makeDeleteMenuController
} from '../factories/application/controllers'
import { auth, is } from '../middlewares'

export default (router: Router): void => {
  router.post('/restaurant/:restaurantId/menu', auth, is, adapt((makeCreateMenuController())))
  router.get('/restaurant/:restaurantId/menu', auth, is, adapt((makeGetMenuController())))
  router.put('/restaurant/:restaurantId/menu/:itemId', auth, is, adapt((makeUpdateMenuController())))
  router.delete('/restaurant/:restaurantId/menu/:itemId', auth, is, adapt((makeDeleteMenuController())))
}
