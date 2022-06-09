import { SendEmailNotification } from '@/data/contracts/mailer'
import { LoadUserAccountByEmailRepository, SendInviteEmployeeRepository } from '@/data/contracts/repos'
import { UserAlreadyExistsError } from '@/domain/errors'
import { SendInviteEmployee } from '@/domain/features'

export class SendInviteEmployeeService implements SendInviteEmployee {
  constructor (
    private readonly employeeRepository: SendInviteEmployeeRepository,
    private readonly userRepository: LoadUserAccountByEmailRepository,
    private readonly sendEmail: SendEmailNotification,
    private readonly URL_FRONTEND: string
  ) {}

  async execute (params: SendInviteEmployee.Params): Promise<SendInviteEmployee.Result> {
    const { email, name, restaurantId } = params
    const user = await this.userRepository.loadByEmail({ email })
    if (user !== undefined) {
      return new UserAlreadyExistsError(email)
    }

    const code = this.generateCode()
    await this.employeeRepository.send({ email, name, restaurantId, code })

    await this.sendEmail.send({
      to: email,
      subject: 'Invite to join the restaurant',
      body: `Hello ${name}, you have been invited to join the restaurant.
      Please, follow the link to accept the invitation: ${this.URL_FRONTEND}/${code}`
    })

    return {
      message: `Invite sent from ${email}`
    }
  }

  private generateCode (): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
