import { BcryptAdapter } from '@/infra/crypto/bcrypter'
import { env } from '@/main/config/env'
export const makeHasherBrcypter = (): BcryptAdapter => {
  const salt = Number(env.crypto.bcrypt.salt)
  return new BcryptAdapter(salt)
}
