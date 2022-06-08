import { PrismaClient } from '@prisma/client'
import {
  DeleteRestaurantByIdRepository,
  LoadMenuById,
  LoadMenuByNAmeAndRestaurantId,
  LoadMenuByRestaurantId,
  SaveMenuRepository,
  UpdateItemMenuRepository
} from '@/data/contracts/repos'

export class MenuRepositoryPrisma implements
LoadMenuByNAmeAndRestaurantId,
LoadMenuByRestaurantId,
LoadMenuById,
UpdateItemMenuRepository,
DeleteRestaurantByIdRepository,
SaveMenuRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) {}

  async delete (params: DeleteRestaurantByIdRepository.Params): Promise<void> {
    await this.prismaClient.menu.delete({
      where: {
        id: params.itemId
      }
    })
  }

  async update (params: UpdateItemMenuRepository.Params): Promise<UpdateItemMenuRepository.Result> {
    return this.prismaClient.menu.update({
      where: {
        id: params.itemId
      },
      data: {
        name: params.name,
        description: params.description ?? undefined,
        price: params.price
      }
    })
  }

  async loadById (params: LoadMenuById.Params): Promise<LoadMenuById.Result> {
    return this.prismaClient.menu.findFirst({
      where: {
        id: params.itemId
      }
    })
  }

  async loadByRestaurantId (params: LoadMenuByRestaurantId.Params): Promise<LoadMenuByRestaurantId.Result> {
    return this.prismaClient.menu.findMany({
      where: {
        restaurantId: params.restaurantId
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }

  async loadByNameAndRestaurantId (params: LoadMenuByNAmeAndRestaurantId.Params): Promise<LoadMenuByNAmeAndRestaurantId.Result> {
    const restaurant = await this.prismaClient.menu.findFirst({
      where: {
        name: params.name,
        AND: {
          restaurantId: params.restaurantId
        }
      }
    })

    return restaurant ?? undefined
  }

  async save (params: SaveMenuRepository.Params): Promise<SaveMenuRepository.Result> {
    const newMenu = await this.prismaClient.menu.create({
      data: {
        name: params.name,
        description: params.description ?? undefined,
        price: params.price,
        restaurantId: params.restaurantId
      }
    })

    return newMenu ?? undefined
  }
}
