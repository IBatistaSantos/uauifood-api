import { IsOwnerOrEmployeMiddleware } from '@/application/middlewares'
import { makeCanRestaurant } from '../gateways/can-repository'

export const makeIsOwnerOrEmployeeMiddleware = (): IsOwnerOrEmployeMiddleware => {
  const restautantRepository = makeCanRestaurant()
  return new IsOwnerOrEmployeMiddleware(
    restautantRepository.isOwnerOrEmploye.bind(restautantRepository)
  )
}
