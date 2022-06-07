import { TypeCuisine } from '@/domain/entities'

export interface LoadRestaurantByNameRepository {
  load: (params: LoadRestaurantByNameRepository.Params) => Promise<LoadRestaurantByNameRepository.Result>
}

export namespace LoadRestaurantByNameRepository {
  export type Params = {
    name: string
  }

  export type Result = undefined | {
    id: string
    name: string
    typeCuisine: string
    ownerId: string
  }
}

export interface SaveRestaurantRepository {
  save: (params: SaveRestaurantRepository.Params) => Promise<SaveRestaurantRepository.Result>
}

export namespace SaveRestaurantRepository {
  export type Params = {
    name: string
    typeCuisine: TypeCuisine
    ownerId: string
  }

  export type Result = {
    id: string
    name: string
    typeCuisine: TypeCuisine
    ownerId: string
  }
}
