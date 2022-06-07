import { Encrypter } from '@/data/contracts/crypto'
import { sign } from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const token = sign({ value }, this.secret)
    return token
  }
}
