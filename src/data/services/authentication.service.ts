import { AuthenticationError } from '@/domain/errors/authentication'
import { Authentication } from '@/domain/features/authentication'
import { Encrypter, HasherComparer } from '../contracts/crypto'
import { LoadUserAccountRepository } from '../contracts/repos'

export class AuthenticationService implements Authentication {
  constructor (
    private readonly userAccountRepository: LoadUserAccountRepository,
    private readonly hasherComparer: HasherComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute (params: Authentication.Params): Promise<any> {
    const user = await this.userAccountRepository.load({ email: params.email })

    if (user === undefined) {
      return new AuthenticationError()
    }

    const isPasswordValid = await this.hasherComparer.compare(params.password, user.password)

    if (!isPasswordValid) {
      return new AuthenticationError()
    }

    const accessToken = await this.encrypter.encrypt(user.id)

    return {
      accessToken,
      user
    }
  }
}
