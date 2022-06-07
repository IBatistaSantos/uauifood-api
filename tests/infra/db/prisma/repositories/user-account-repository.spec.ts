import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended'
import { PrismaClient, User } from '@prisma/client'

import { UserAccountRepositoryPrisma } from '@/infra/db/prisma/repositories/user-account-repository'
import prisma from '@/infra/db/prisma/client'

jest.mock('@/infra/db/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

describe('UserAccountRepositoryPrisma', () => {
  let sut: UserAccountRepositoryPrisma
  let prismaMock: DeepMockProxy<PrismaClient>
  let account: User

  beforeAll(() => {
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
    account = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  })

  beforeEach(async () => {
    mockReset(prismaMock)
    sut = new UserAccountRepositoryPrisma(prismaMock)

    prismaMock.user.findFirst.mockResolvedValue(account)
    prismaMock.user.create.mockResolvedValue(account)
  })

  it('should return account when load returning account', async () => {
    const result = await sut.loadByEmail({ email: account.email })
    expect(result).toHaveProperty('id')
    expect(result?.email).toEqual(account.email)
  })

  it('should return null when load returning null', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null)
    const result = await sut.loadByEmail({ email: account.email })
    expect(result).toBe(undefined)
  })

  it('should create new account', async () => {
    const result = await sut.save(account)

    expect(result).toHaveProperty('id')
    expect(result?.email).toEqual(account.email)
  })
})
