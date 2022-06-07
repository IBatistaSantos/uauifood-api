import { JwtAdapter } from '@/infra/crypto/jwt'
import { env } from '@/main/config/env'

export const makejwtAdapter = (): JwtAdapter => {
  const secret = env.crypto.jwt.secret as string
  return new JwtAdapter(secret)
}
