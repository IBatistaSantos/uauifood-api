import { Hasher } from '@/data/contracts/crypto'
import { LoadUserAccountByEmailRepository, LoadUserAccountByIdRepository, UpdateUserAccountRepository } from '@/data/contracts/repos'
import { UpdateUserService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'

describe('UpdateUserService', () => {
  let sut: UpdateUserService
  let userAccountRepository: MockProxy<LoadUserAccountByEmailRepository & LoadUserAccountByIdRepository & UpdateUserAccountRepository>
  let hasher: MockProxy<Hasher>

  beforeAll(() => {
    userAccountRepository = mock()
    hasher = mock()

    userAccountRepository.loadById.mockResolvedValue({
      id: 'user-id',
      name: 'user-name',
      email: 'user-email',
      password: 'user-password'
    })

    userAccountRepository.loadByEmail.mockResolvedValue(undefined)

    userAccountRepository.update.mockResolvedValue({
      id: '1',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })

    hasher.hash.mockResolvedValue('hashed-password')
  })

  beforeEach(() => {
    sut = new UpdateUserService(userAccountRepository, hasher)
  })

  it('should call userAccountRepository.loadById with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: '1'
    })

    expect(userAccountRepository.loadById).toHaveBeenCalledWith({ userId: '1' })
    expect(userAccountRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return Error when userAccountRepository.loadById retuns a user', async () => {
    userAccountRepository.loadById.mockResolvedValueOnce(undefined)

    const userId = 'any_user_id'
    const result = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId
    })

    expect(result).toEqual(new Error(`User with id ${userId} not found`))
  })

  it('should call userAccountRepository.loadByEmail with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: 'any_userId'
    })

    expect(userAccountRepository.loadByEmail).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should return Error when userRepository.loadByEmail retuns a user', async () => {
    userAccountRepository.loadByEmail.mockResolvedValueOnce({
      id: 'other_user_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    })

    const email = 'any_email'
    const result = await sut.execute({
      email,
      name: 'any_name',
      password: 'any_password',
      userId: 'any_user_id'
    })

    expect(result).toEqual(new Error(`User with email ${email} already exists`))
  })

  it('should call hasher.hash with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: 'any_user_id'
    })

    expect(hasher.hash).toHaveBeenCalledWith('any_password')
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('should call userRepository.update with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: 'any_user_id'
    })

    expect(userAccountRepository.update).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      password: 'hashed-password',
      userId: 'any_user_id'
    })
    expect(userAccountRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should call hasher.hash with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: 'any_user_id'
    })

    expect(hasher.hash).toHaveBeenCalledWith('any_password')
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('should returns Account on success', async () => {
    const result = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      userId: 'any_user_id'
    })

    expect(result).toEqual({
      id: '1',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })
  })
})
