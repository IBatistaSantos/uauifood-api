import { PrismaClient } from '@prisma/client'
import { LoadUserAccountByEmailRepository, SaveUserAccountRepository } from '@/data/contracts/repos'

export class UserAccountRepositoryPrisma implements SaveUserAccountRepository, LoadUserAccountByEmailRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async loadByEmail (params: LoadUserAccountByEmailRepository.Params): Promise<LoadUserAccountByEmailRepository.Result> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        email: params.email
      }
    })

    return user ?? undefined
  }

  async save (params: SaveUserAccountRepository.Params): Promise<SaveUserAccountRepository.Result> {
    return this.prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        name: params.name
      }
    })
  }
}
