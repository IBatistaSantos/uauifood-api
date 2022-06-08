import { TypeCuisine } from '@/domain/entities'

export interface LoadRestaurantByNameRepository {
  load: (params: LoadRestaurantByNameRepository.Params) => Promise<LoadRestaurantByNameRepository.Result>
}

export interface LoadRestaurantByIdRepository {
  loadById: (params: LoadRestaurantByIdRepository.Params) => Promise<LoadRestaurantByIdRepository.Result>
}

export interface UpdateRestaurantRepository {
  update: (params: UpdateRestaurantRepository.Params) => Promise<UpdateRestaurantRepository.Result>
}

export interface SaveRestaurantRepository {
  save: (params: SaveRestaurantRepository.Params) => Promise<SaveRestaurantRepository.Result>
}

export interface ListRestaurantRepository {
  listAll: (params: ListRestaurantRepository.Params) => Promise<ListRestaurantRepository.Result>
}

export interface DeleteRestaurantByIdRepository {
  delete: (params: DeleteRestaurantByIdRepository.Params) => Promise<void>
}

export namespace DeleteRestaurantByIdRepository {
  export type Params = {
    restaurantId: string
  }
}

export namespace UpdateRestaurantRepository {
  export type Params = {
    restaurantId: string
    name?: string
    typeCuisine?: TypeCuisine
  }
  export type Result = undefined | {
    id: string
    name: string
    typeCuisine: string
    owner: {
      id: string
      name: string
      email: string
    }
  }
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

export namespace ListRestaurantRepository {
  export type Params = {
    active?: boolean

  }
  export type Result = undefined | Array<{
    id: string
    name: string
    typeCuisine: string
    owner: {
      id: string
      name: string
      email: string
    }
  }>
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

export namespace LoadRestaurantByIdRepository {
  export type Params = {
    id: string
  }

  export type Result = undefined | {
    id: string
    name: string
    typeCuisine: string
    ownerId: string
    owner: {
      id: string
      name: string
      email: string
    }
  }
}
