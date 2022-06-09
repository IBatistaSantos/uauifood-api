import { InviteStatus, PrismaClient } from '@prisma/client'
import {
  LoadInviteByCode,
  LoadInviteByCodeRepository,
  SaveEmployee,
  SaveEmployeeRepository,
  SendInviteEmployee,
  SendInviteEmployeeRepository,
  UpdateInviteEmployee,
  UpdateInviteEmployeeRepository
} from '@/data/contracts/repos'

export class EmployeeRepositoryPrisma implements
SendInviteEmployeeRepository, LoadInviteByCodeRepository, UpdateInviteEmployeeRepository, SaveEmployeeRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async loadByCode (params: LoadInviteByCode.Params): Promise<LoadInviteByCode.Result> {
    const invite = await this.prismaClient.invite.findFirst({
      where: {
        code: params.code
      }
    })

    if (invite === null) {
      return undefined
    }

    return {
      id: invite.id,
      restaurantId: invite.restaurantId,
      status: invite.status
    }
  }

  async updateInvite (params: UpdateInviteEmployee.Params): Promise<void> {
    await this.prismaClient.invite.update({
      where: {
        id: params.inviteId
      },
      data: {
        status: params.status as InviteStatus
      }
    })
  }

  async save (params: SaveEmployee.Params): Promise<SaveEmployee.Result> {
    return this.prismaClient.employee.create({
      data: {
        userId: params.userId,
        restaurantId: params.restaurantId
      }
    })
  }

  async send (params: SendInviteEmployee.Params): Promise<void> {
    await this.prismaClient.invite.create({
      data: {
        email: params.email,
        name: params.name,
        code: params.code,
        restaurantId: params.restaurantId

      }
    })
  }
}
