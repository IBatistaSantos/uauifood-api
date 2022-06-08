import { Encrypter, Decrypter, TokenValidator } from '@/data/contracts/crypto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}
  async validate (params: TokenValidator.Params): Promise<string> {
    const { token } = params
    const [,tokenFormatted] = token.split(' ')
    const { value } = verify(tokenFormatted, this.secret) as JwtPayload

    return value
  }

  async encrypt (value: string): Promise<string> {
    const token = sign({ value }, this.secret)
    return token
  }
}
