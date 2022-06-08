import { LoadUserAccountByIdRepository } from '@/data/contracts/repos'
import { UserNotFoundError } from '@/domain/errors'
import { ProfileUser } from '@/domain/features'

export class ProfileUserService implements ProfileUser {
  constructor (
    private readonly userAccountRepository: LoadUserAccountByIdRepository
  ) {}

  async execute (params: ProfileUser.Params): Promise<ProfileUser.Result> {
    const { userId } = params

    const user = await this.userAccountRepository.loadById({ userId })

    if (user === undefined) {
      return new UserNotFoundError(`User with id ${userId} not found`)
    }

    return user
  }
}
