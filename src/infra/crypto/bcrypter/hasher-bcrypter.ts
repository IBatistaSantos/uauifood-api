import bcrypt from 'bcryptjs'
import { Hasher } from '@/data/contracts/crypto'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
