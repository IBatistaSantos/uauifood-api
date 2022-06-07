import { Encrypter, HasherComparer } from '@/data/contracts/crypto'
import { LoadUserAccountByEmailRepository } from '@/data/contracts/repos'
import { AuthenticationService } from '@/data/services'

import { AuthenticationError } from '@/domain/errors/authentication'
import { mock, MockProxy } from 'jest-mock-extended'

describe('AuthenticationService', () => {
  let sut: AuthenticationService
  let userAccountRepository: MockProxy<LoadUserAccountByEmailRepository>
  let hasher: MockProxy<HasherComparer>
  let encrypter: MockProxy<Encrypter>

  beforeAll(() => {
    userAccountRepository = mock()
    encrypter = mock()
    hasher = mock()

    userAccountRepository.loadByEmail.mockResolvedValue({
      id: '1',
      email: 'any_email',
      name: 'any_name',
      password: 'hasher_password'
    })
    hasher.compare.mockResolvedValue(true)
    encrypter.encrypt.mockResolvedValue('access-token')
  })

  beforeEach(() => {
    sut = new AuthenticationService(userAccountRepository, hasher, encrypter)
  })

  it('should call userAccountRepository.load with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(userAccountRepository.loadByEmail).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when userAccountRepository.load retuns a user', async () => {
    userAccountRepository.loadByEmail.mockResolvedValueOnce(undefined)

    const result = await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(result).toEqual(new AuthenticationError())
  })

  it('should call hasher.compare with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(hasher.compare).toHaveBeenCalledWith('any_password', 'hasher_password')
    expect(hasher.compare).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when hasher.compare retuns false', async () => {
    hasher.compare.mockResolvedValueOnce(false)

    const result = await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(result).toEqual(new AuthenticationError())
  })

  it('should call encrypter.encrypt with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(encrypter.encrypt).toHaveBeenCalledWith('1')
    expect(encrypter.encrypt).toHaveBeenCalledTimes(1)
  })

  it('should returns AccessToken and User on success', async () => {
    const result = await sut.execute({
      email: 'any_email',
      password: 'any_password'
    })

    expect(result).toEqual({
      accessToken: 'access-token',
      user: {
        id: '1',
        email: 'any_email',
        name: 'any_name',
        password: 'hasher_password'
      }
    })
  })
})
