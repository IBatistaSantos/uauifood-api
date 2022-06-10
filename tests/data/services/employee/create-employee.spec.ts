import { Hasher } from '@/data/contracts/crypto'
import { LoadInviteByCodeRepository, LoadUserAccountByEmailRepository, SaveEmployeeRepository, SaveUserAccountRepository, UpdateInviteEmployeeRepository } from '@/data/contracts/repos'
import { CreateEmployeeService } from '@/data/services'
import { InviteNotFoundError, UserAlreadyExistsError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

jest.useFakeTimers().setSystemTime(new Date(2020, 1, 1))

describe('CreateEmployeeService', () => {
  let sut: CreateEmployeeService
  let userAccountRepository: MockProxy<LoadUserAccountByEmailRepository & SaveUserAccountRepository>
  let employeeRepository: MockProxy<LoadInviteByCodeRepository & UpdateInviteEmployeeRepository & SaveEmployeeRepository>
  let hasher: MockProxy<Hasher>

  beforeAll(() => {
    userAccountRepository = mock()
    employeeRepository = mock()
    hasher = mock()

    userAccountRepository.loadByEmail.mockResolvedValue(undefined)
    hasher.hash.mockResolvedValue('hashed-password')
    userAccountRepository.save.mockResolvedValue({
      id: '1',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })

    employeeRepository.save.mockResolvedValue({
      id: '1',
      restaurantId: 'restaurant-id',
      userId: 'user-id',
      active: true,
      createdAt: new Date(2020, 1, 1),
      updatedAt: new Date(2020, 1, 1)
    })

    employeeRepository.loadByCode.mockResolvedValue({
      id: 'invite-id',
      restaurantId: 'restaurant-id',
      status: 'pending'
    })
  })

  beforeEach(() => {
    sut = new CreateEmployeeService(employeeRepository, userAccountRepository, hasher)
  })

  it('should call userRepository.loadByEmail with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(userAccountRepository.loadByEmail).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccountRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should return Error when userAccountRepository.loadById retuns a user', async () => {
    userAccountRepository.loadByEmail.mockResolvedValueOnce({
      id: 'user-id',
      name: 'user-name',
      email: 'user-email',
      password: 'user-password'
    })

    const email = 'any_email'
    const result = await sut.execute({
      email,
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(result).toEqual(new UserAlreadyExistsError(email))
  })

  it('should call employeeRepository.loadByCode with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(employeeRepository.loadByCode).toHaveBeenCalledWith({ code: 'any_code' })
    expect(employeeRepository.loadByCode).toHaveBeenCalledTimes(1)
  })

  it('should return Error when  employeeRepository.loadByCode retuns a undefined', async () => {
    employeeRepository.loadByCode.mockResolvedValueOnce(undefined)

    const code = 'any_code'
    const result = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code
    })

    expect(result).toEqual(new InviteNotFoundError(code))
  })

  it('should call userRepository.save with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(userAccountRepository.save).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      password: 'hashed-password'
    })
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call employeeRepository.save with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(employeeRepository.save).toHaveBeenCalledWith({
      userId: '1',
      restaurantId: 'restaurant-id'
    })
    expect(employeeRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call employeeRepository.update with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(employeeRepository.updateInvite).toHaveBeenCalledWith({
      inviteId: 'invite-id',
      status: 'ACCEPTED'
    })
    expect(employeeRepository.updateInvite).toHaveBeenCalledTimes(1)
  })

  it('should return Employee when all steps are successful', async () => {
    const result = await sut.execute({
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      code: 'any_code'
    })

    expect(result).toEqual({
      id: '1',
      restaurantId: 'restaurant-id',
      userId: 'user-id',
      active: true,
      createdAt: new Date(2020, 1, 1),
      updatedAt: new Date(2020, 1, 1)

    })
  })
})
