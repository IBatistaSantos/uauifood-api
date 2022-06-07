
import { UserAccountRepositoryPrisma } from '@/infra/db/prisma/repositories'
import prismaClient from '@/infra/db/prisma/client'

export const makeUserAccountRepository = (): UserAccountRepositoryPrisma => {
  return new UserAccountRepositoryPrisma(prismaClient)
}
