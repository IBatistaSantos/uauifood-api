import { PrismaClient } from '@prisma/client'
import {
  ListRestaurantRepository,
  LoadRestaurantByIdRepository,
  LoadRestaurantByNameRepository,
  SaveRestaurantRepository,
  UpdateRestaurantRepository,
  DeleteRestaurantByIdRepository
} from '@/data/contracts/repos'
import { TypeCuisine } from '@/domain/features'

export class RestaurantRepositoryPrisma implements
SaveRestaurantRepository,
LoadRestaurantByNameRepository,
LoadRestaurantByIdRepository,
UpdateRestaurantRepository,
DeleteRestaurantByIdRepository,
ListRestaurantRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async delete (params: DeleteRestaurantByIdRepository.Params): Promise<void> {
    await this.prismaClient.restaurant.update({
      where: {
        id: params.itemId
      },
      data: {
        active: false
      }
    })
  }

  async listAll (params: ListRestaurantRepository.Params): Promise<ListRestaurantRepository.Result> {
    const { active } = params
    const restaurants = await this.prismaClient.restaurant.findMany({
      where: {
        active: active ?? true
      },
      include: {
        owner: true
      }
    })

    return restaurants ?? []
  }

  async loadById (params: LoadRestaurantByIdRepository.Params): Promise<LoadRestaurantByIdRepository.Result> {
    const restaurant = await this.prismaClient.restaurant.findFirst({
      where: {
        id: params.id
      },
      include: {
        owner: true
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

  async isOwnerOrEmploye (params: {userId: string, restaurantId: string}): Promise<boolean> {
    const restaurant = await this.prismaClient.restaurant.findFirst({
      where: {
        id: params.restaurantId
      },
      include: {
        owner: true
      }
    })

    if (restaurant === null) {
      return false
    }

    const isOwner = restaurant.owner.id === params.userId

    if (isOwner) {
      return true
    }

    const employee = await this.prismaClient.employee.findFirst({
      where: {
        userId: params.userId
      }
    })

    if (employee === null) {
      return false
    }

    return employee.restaurantId === params.restaurantId
  }
}
