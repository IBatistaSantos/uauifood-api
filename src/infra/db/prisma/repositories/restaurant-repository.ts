import { PrismaClient } from '@prisma/client'
import { LoadRestaurantByNameRepository, SaveRestaurantRepository } from '@/data/contracts/repos'
import { TypeCuisine } from '@/domain/features'

export class RestaurantRepositoryPrisma implements SaveRestaurantRepository, LoadRestaurantByNameRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async save (params: SaveRestaurantRepository.Params): Promise<SaveRestaurantRepository.Result> {
    const result = await this.prismaClient.restaurant.create({
      data: {
        name: params.name,
        typeCuisine: params.typeCuisine,
        ownerId: params.ownerId
      }
    })

    const restaurant = {
      id: result.id,
      name: result.name,
      typeCuisine: result.typeCuisine as TypeCuisine,
      ownerId: result.ownerId
    }

    return restaurant ?? undefined
  }

  async load (params: LoadRestaurantByNameRepository.Params): Promise<LoadRestaurantByNameRepository.Result> {
    const newRestaurant = await this.prismaClient.restaurant.findFirst({
      where: {
        name: params.name
      }
    })

    if (newRestaurant === null) {
      return undefined
    }

    const restaurant = {
      id: newRestaurant.id,
      name: newRestaurant.name,
      typeCuisine: newRestaurant.typeCuisine,
      ownerId: newRestaurant.ownerId
    }

    return restaurant ?? undefined
  }
}
