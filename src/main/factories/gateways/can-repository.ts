import { RestaurantRepositoryPrisma } from '@/infra/db/prisma/repositories/restaurant-repository'
import prismaClient from '@/infra/db/prisma/client'

export const makeCanRestaurant = (): RestaurantRepositoryPrisma => new RestaurantRepositoryPrisma(prismaClient)
