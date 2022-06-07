import { PrismaClient } from '@prisma/client'
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/data/contracts/repos'

export class UserAccountRepositoryPrisma implements SaveUserAccountRepository, LoadUserAccountRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async save (params: SaveUserAccountRepository.Params): Promise<SaveUserAccountRepository.Result> {
    return this.prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        name: params.name
      }
    })
  }

  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: params.email
      }
    })

    return user ?? undefined
  }
}
