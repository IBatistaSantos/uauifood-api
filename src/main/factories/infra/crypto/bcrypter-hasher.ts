import { BcryptAdapter } from '@/infra/crypto/bcrypter'

export const makeHasherBrcypter = (): BcryptAdapter => {
  const salt = 10
  return new BcryptAdapter(salt)
}
