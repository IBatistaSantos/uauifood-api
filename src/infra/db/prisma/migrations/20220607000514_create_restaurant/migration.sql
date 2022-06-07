-- CreateEnum
CREATE TYPE "TypeCuisine" AS ENUM ('Arabe', 'Brasileira', 'Chinesa', 'Pizza');

-- CreateTable
CREATE TABLE "restaurants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeCuisine" "TypeCuisine" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
