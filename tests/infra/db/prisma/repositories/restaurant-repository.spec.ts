import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient } from '@prisma/client'

import { RestaurantRepositoryPrisma } from '@/infra/db/prisma/repositories'
import prisma from '@/infra/db/prisma/client'
import { TypeCuisine } from '@/domain/entities'

jest.mock('@/infra/db/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

describe('RestaurantRepositoryPrisma', () => {
  let sut: RestaurantRepositoryPrisma
  let prismaMock: DeepMockProxy<PrismaClient>
  let restaurant: any

  beforeAll(() => {
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
    restaurant = {
      id: 'any_id',
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      ownerId: 'any_owner_id',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })

  beforeEach(async () => {
    mockReset(prismaMock)
    sut = new RestaurantRepositoryPrisma(prismaMock)

    prismaMock.restaurant.findFirst.mockResolvedValue(restaurant)
    prismaMock.restaurant.create.mockResolvedValue(restaurant)
  })

  it('should return restaurant when load returning a restaurant', async () => {
    const result = await sut.load({ name: restaurant.name })
    expect(result).toHaveProperty('id')
    expect(result?.name).toEqual(restaurant.name)
  })

  it('should return null when load returning null', async () => {
    prismaMock.restaurant.findFirst.mockResolvedValueOnce(null)
    const result = await sut.load({ name: restaurant.name })
    expect(result).toBe(undefined)
  })

  it('should create new restaurant', async () => {
    const result = await sut.save(restaurant)

    expect(result).toHaveProperty('id')
    expect(result?.name).toEqual(restaurant.name)
  })
})
