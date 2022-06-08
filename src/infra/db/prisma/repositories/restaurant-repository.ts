import { PrismaClient } from '@prisma/client'
import { LoadRestaurantByIdRepository, LoadRestaurantByNameRepository, SaveRestaurantRepository, UpdateRestaurantRepository } from '@/data/contracts/repos'
import { TypeCuisine } from '@/domain/features'

export class RestaurantRepositoryPrisma implements SaveRestaurantRepository, LoadRestaurantByNameRepository, LoadRestaurantByIdRepository, UpdateRestaurantRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async loadById (params: LoadRestaurantByIdRepository.Params): Promise<LoadRestaurantByIdRepository.Result> {
    const restaurant = await this.prismaClient.restaurant.findFirst({
      where: {
        id: params.id
      }
    })

    return restaurant ?? undefined
  }

  async update (params: UpdateRestaurantRepository.Params): Promise<UpdateRestaurantRepository.Result> {
    try {
      const updatedRestaurants = await this.prismaClient.restaurant.update({
        where: {
          id: params.restaurantId
        },
        data: {
          name: params.name ?? undefined,
          typeCuisine: params.typeCuisine as TypeCuisine ?? undefined
        },
        include: {
          owner: true
        }
      })

      return updatedRestaurants ?? undefined
    } catch (error) {
      return undefined
    }
  }

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
