import { Hasher } from '@/data/contracts/crypto'
import { LoadUserAccountByEmailRepository, LoadUserAccountByIdRepository, UpdateUserAccountRepository } from '@/data/contracts/repos'
import { UpdateUser } from '@/domain/features'

export class UpdateUserService implements UpdateUser {
  constructor (
    private readonly userRepository:
    LoadUserAccountByEmailRepository &
    LoadUserAccountByIdRepository &
    UpdateUserAccountRepository,

    private readonly hasher: Hasher
  ) {}

  async execute (params: UpdateUser.Params): Promise<UpdateUser.Result> {
    const { userId, email, name, password } = params
    let passwordHashed
    const userAlreadyExists = await this.userRepository.loadById({ userId: params.userId })

    if (userAlreadyExists === undefined) {
      return new Error(`User with id ${params.userId} not found`)
    }

    if (email !== undefined) {
      const userAlreadyExistsWithEmail = await this.userRepository.loadByEmail({ email })

      if (userAlreadyExistsWithEmail !== undefined && userAlreadyExistsWithEmail.id !== userId) {
        return new Error(`User with email ${email} already exists`)
      }
    }

    if (password !== undefined) {
      passwordHashed = await this.hasher.hash(password)
    }

    const updatedUser = await this.userRepository.update({
      userId,
      name,
      email,
      password: passwordHashed
    })

    return updatedUser
  }
}
