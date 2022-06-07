import prisma from '@/infra/db/prisma/client'
import { PrismaClient } from '@prisma/client'

describe('PrismaClient', () => {
  it('should create new instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(PrismaClient)
  })
})
