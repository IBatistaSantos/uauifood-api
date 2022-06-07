
import { CreateRestaurantService } from '@/data/services'
import { CreateRestaurant } from '@/domain/features'
import { makeHasherBrcypter } from '../infra/crypto/bcrypter-hasher'

import { makeRestaurantRepository } from '../infra/repos/restaurant-repository'
import { makeUserAccountRepository } from '../infra/repos/user-account-repository'

export const makeCreateRestaurante = (): CreateRestaurant => {
  return new CreateRestaurantService(
    makeUserAccountRepository(),
    makeRestaurantRepository(),
    makeHasherBrcypter()
  )
}
