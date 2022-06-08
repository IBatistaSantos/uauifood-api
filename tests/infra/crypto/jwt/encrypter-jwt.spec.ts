import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/crypto/jwt'

jest.mock('jsonwebtoken')

describe('JwtAdapter', () => {
  let sut: JwtAdapter
  let secret: string
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    secret = 'any_secret'
  })

  beforeEach(() => {
    sut = new JwtAdapter(secret)
  })

  describe('encrypt', () => {
    let token: string
    beforeAll(() => {
      token = 'any_token'
      fakeJwt.sign.mockImplementation(() => token)
    })
    it('should call sign with correct parameters', async () => {
      const jwtSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(jwtSpy).toHaveBeenCalledWith({ value: 'any_id' }, secret)
    })

    it('should return a token from sign with correct values', async () => {
      const result = await sut.encrypt('any_id')
      expect(result).toBe('any_token')
    })

    it('should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validate', () => {
    let token: string
    let value: string
    beforeAll(() => {
      token = 'Bearer any_token'
      value = 'any_id'
      fakeJwt.verify.mockImplementation(() => ({ value }))
    })

    it('should call verify with correct parameters', async () => {
      const jwtSpy = jest.spyOn(jwt, 'verify')
      await sut.validate({ token })
      expect(jwtSpy).toHaveBeenCalledWith('any_token', secret)
    })

    it('should return a value from verify with correct values', async () => {
      const result = await sut.validate({ token })
      expect(result).toBe(value)
    })

    it('should rethrow if verify throws', async () => {
      fakeJwt.verify.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.validate({ token })
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
})
