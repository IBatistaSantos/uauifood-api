import { BcryptAdapter } from '@/infra/crypto/bcrypter'
import bcrypt from 'bcryptjs'

jest.mock('bcryptjs')

describe('BcryptHasher', () => {
  let sut: BcryptAdapter
  let fakeBcrypt: jest.Mocked<typeof bcrypt>
  let salt: number

  beforeAll(() => {
    salt = 15
    fakeBcrypt = bcrypt as jest.Mocked<typeof bcrypt>
  })

  beforeEach(() => {
    sut = new BcryptAdapter(salt)
  })

  describe('hash()', () => {
    beforeAll(() => {
      fakeBcrypt.hash.mockImplementation(() => 'hash_value')
      fakeBcrypt.compare.mockImplementation(() => true)
    })

    it('should call hash with correct value', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return valid hash on success', async () => {
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash_value')
    })

    it('should throw if hash throws', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      await expect(sut.hash('any_value')).rejects.toThrow()
    })
  })
})
