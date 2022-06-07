
import { RestaurantRepositoryPrisma } from '@/infra/db/prisma/repositories'
import prismaClient from '@/infra/db/prisma/client'

export const makeRestaurantRepository = (): RestaurantRepositoryPrisma => {
  return new RestaurantRepositoryPrisma(prismaClient)
}
