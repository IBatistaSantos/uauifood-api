import { LoadUserAccountByIdRepository } from '@/data/contracts/repos'
import { ProfileUserService } from '@/data/services'
import { UserNotFoundError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ProfileUserService', () => {
  let sut: ProfileUserService
  let userAccountRepository: MockProxy<LoadUserAccountByIdRepository>

  beforeAll(() => {
    userAccountRepository = mock()

    userAccountRepository.loadById.mockResolvedValue({
      id: 'user-id',
      name: 'user-name',
      email: 'user-email',
      password: 'user-password'
    })
  })

  beforeEach(() => {
    sut = new ProfileUserService(userAccountRepository)
  })

  it('should call userAccountRepository.loadById with correct params', async () => {
    await sut.execute({ userId: '1' })

    expect(userAccountRepository.loadById).toHaveBeenCalledWith({ userId: '1' })
    expect(userAccountRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should return Error when userAccountRepository.loadById retuns a undefined', async () => {
    userAccountRepository.loadById.mockResolvedValueOnce(undefined)

    const userId = 'any_user_id'
    const result = await sut.execute({ userId })

    expect(result).toEqual(new UserNotFoundError(`User with id ${userId} not found`))
  })

  it('should returns Account on success', async () => {
    const result = await sut.execute({ userId: 'any_user_id' })

    expect(result).toEqual({
      id: 'user-id',
      name: 'user-name',
      email: 'user-email',
      password: 'user-password'
    })
  })
})
