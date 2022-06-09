import { PrismaClient } from '@prisma/client'
import {
  SendInviteEmployee,
  SendInviteEmployeeRepository
} from '@/data/contracts/repos'

export class EmployeeRepositoryPrisma implements SendInviteEmployeeRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

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
