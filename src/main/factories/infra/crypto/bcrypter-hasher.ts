import { BcryptAdapter } from '@/infra/crypto/bcrypter'

export const makeRestaurantRepository = (): BcryptAdapter => {
  const salt = 10
  return new BcryptAdapter(salt)
}
