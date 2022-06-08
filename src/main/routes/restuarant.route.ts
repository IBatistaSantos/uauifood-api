import { Router } from 'express'
import { adaptExpressRoute as adapt } from '@/main/adapters'
import {} from '../'
import {
  makeCreateRestaurantController,
  makeUpdateRestaurantController,
  makeDetailsRestaurantController,
  makeListRestaurantController,
  makeDeleteRestaurantController
} from '../factories/application/controllers'
import { auth } from '../middlewares'
import { can } from '../middlewares/can'

export default (router: Router): void => {
  router.get('/restaurant/:restaurantId', auth, adapt((makeDetailsRestaurantController())))
  router.get('/restaurant', adapt((makeListRestaurantController())))
  router.post('/restaurant', adapt((makeCreateRestaurantController())))
  router.put('/restaurant/:restaurantId', auth, can, adapt((makeUpdateRestaurantController())))
  router.delete('/restaurant/:restaurantId', auth, adapt((makeDeleteRestaurantController())))
}
