import { PrismaClient } from '@prisma/client'
import { LoadUserAccountByEmailRepository, LoadUserAccountByIdRepository, SaveUserAccountRepository, UpdateUserAccountRepository } from '@/data/contracts/repos'

export class UserAccountRepositoryPrisma implements
SaveUserAccountRepository,
LoadUserAccountByEmailRepository,
UpdateUserAccountRepository,
LoadUserAccountByIdRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async loadById (params: LoadUserAccountByIdRepository.Params): Promise<LoadUserAccountByIdRepository.Result> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        id: params.userId
      }
    })

    return user ?? undefined
  }

  async update (params: UpdateUserAccountRepository.Params): Promise<UpdateUserAccountRepository.Result> {
    return this.prismaClient.user.update({
      where: {
        id: params.userId
      },
      data: {
        name: params.name,
        email: params.email,
        password: params.password
      }
    })
  }

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
