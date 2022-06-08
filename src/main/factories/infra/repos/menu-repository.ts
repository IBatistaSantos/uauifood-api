
import { MenuRepositoryPrisma } from '@/infra/db/prisma/repositories'
import prismaClient from '@/infra/db/prisma/client'

export const makeMenuRepository = (): MenuRepositoryPrisma => {
  return new MenuRepositoryPrisma(prismaClient)
}
