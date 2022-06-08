import { JwtAdapter } from '@/infra/crypto/jwt/encrypter-jwt'
import { env } from '@/main/config/env'

export const makeJwtTokenHandler = (): JwtAdapter => new JwtAdapter(env.crypto.jwt.secret as string)
