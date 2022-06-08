import { CanMiddleware } from '@/application/middlewares'
// import { makeJwtTokenHandler } from '@/main/factories/gateways'
import { makeCanRestaurant } from '../gateways/can-repository'

export const makeCanMiddleware = (): CanMiddleware => {
/*   const jwtTokenHandler = makeJwtTokenHandler() */
  const restautantRepository = makeCanRestaurant()
  return new CanMiddleware(
    restautantRepository.isOwnerOrEmploye.bind(restautantRepository)
  )
}
