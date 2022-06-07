import bcrypt from 'bcryptjs'
import { Hasher, HasherComparer } from '@/data/contracts/crypto'

export class BcryptAdapter implements Hasher, HasherComparer {
  constructor (private readonly salt: number) {}
  async compare (value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash)
  }

  async hash (value: string): Promise<string> {
    return bcrypt.hash(value, this.salt)
  }
}
