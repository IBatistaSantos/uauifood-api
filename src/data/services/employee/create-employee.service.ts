import { Hasher } from '@/data/contracts/crypto'
import { LoadInviteByCodeRepository, LoadUserAccountByEmailRepository, SaveUserAccountRepository, SaveEmployeeRepository, UpdateInviteEmployeeRepository } from '@/data/contracts/repos'
import { InviteNotFoundError, UserAlreadyExistsError } from '@/domain/errors'
import { CreateEmployee } from '@/domain/features'

export class CreateEmployeeService implements CreateEmployee {
  constructor (
    private readonly employeeRepository: LoadInviteByCodeRepository & UpdateInviteEmployeeRepository & SaveEmployeeRepository,
    private readonly userRepository: LoadUserAccountByEmailRepository & SaveUserAccountRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (params: CreateEmployee.Params): Promise<CreateEmployee.Result> {
    const { email, name, password, code } = params
    const user = await this.userRepository.loadByEmail({ email })
    if (user !== undefined) {
      return new UserAlreadyExistsError(email)
    }

    const invite = await this.employeeRepository.loadByCode({ code })

    if (invite === undefined) {
      return new InviteNotFoundError(code)
    }

    const userAccount = await this.userRepository.save({
      email,
      name,
      password: await this.hasher.hash(password)
    })

    if (userAccount === undefined) {
      return new Error('Unable to create user account')
    }

    const employee = await this.employeeRepository.save({
      userId: userAccount.id,
      restaurantId: invite.restaurantId
    })

    if (employee === undefined) {
      return new Error('Unable to create employee')
    }

    await this.employeeRepository.updateInvite({
      inviteId: invite.id,
      status: 'ACCEPTED'
    })

    return employee
  }
}
