import { SendEmailNotification } from '@/data/contracts/mailer'
import { LoadUserAccountByEmailRepository, SendInviteEmployeeRepository } from '@/data/contracts/repos'
import { SendInviteEmployeeService } from '@/data/services'
import { UserAlreadyExistsError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

jest.useFakeTimers().setSystemTime(new Date(2020, 1, 1))

describe('SendInviteEmployeeService', () => {
  let sut: SendInviteEmployeeService
  let userAccountRepository: MockProxy<LoadUserAccountByEmailRepository>
  let employeeRepository: MockProxy<SendInviteEmployeeRepository>
  let mailer: MockProxy<SendEmailNotification>
  let urlFrontend: string

  beforeAll(() => {
    userAccountRepository = mock()
    employeeRepository = mock()
    mailer = mock()
    urlFrontend = 'http://localhost:3000'

    userAccountRepository.loadByEmail.mockResolvedValue(undefined)
    employeeRepository.send.mockResolvedValue()
    mailer.send.mockResolvedValue()
  })

  beforeEach(() => {
    sut = new SendInviteEmployeeService(employeeRepository, userAccountRepository, mailer, urlFrontend)
  })

  it('should call userRepository.loadByEmail with correct params', async () => {
    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      restaurantId: 'any_id'
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
      restaurantId: 'any_id'
    })

    expect(result).toEqual(new UserAlreadyExistsError(email))
  })

  it('should call employeeRepository.send with correct params', async () => {
    jest.spyOn(sut, 'generateCode').mockReturnValue('any_code')

    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      restaurantId: 'any_id'
    })

    expect(employeeRepository.send).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      restaurantId: 'any_id',
      code: 'any_code'
    })
    expect(employeeRepository.send).toHaveBeenCalledTimes(1)
  })

  it('should call sendEmail.send with correct params', async () => {
    jest.spyOn(sut, 'generateCode').mockReturnValue('any_code')

    await sut.execute({
      email: 'any_email',
      name: 'any_name',
      restaurantId: 'any_id'
    })

    expect(mailer.send).toHaveBeenCalled()
    expect(mailer.send).toHaveBeenCalledTimes(1)
  })
})
