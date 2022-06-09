
import { EmployeeRepositoryPrisma } from '@/infra/db/prisma/repositories'
import prismaClient from '@/infra/db/prisma/client'

export const makeEmployeeRepository = (): EmployeeRepositoryPrisma => {
  return new EmployeeRepositoryPrisma(prismaClient)
}
