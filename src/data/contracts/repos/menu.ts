import { Menu } from '@/domain/entities'

export interface LoadMenuByNAmeAndRestaurantId {
  loadByNameAndRestaurantId: (params: LoadMenuByNAmeAndRestaurantId.Params) => Promise<LoadMenuByNAmeAndRestaurantId.Result>
}
export interface LoadMenuById {
  loadById: (params: LoadMenuById.Params) => Promise<LoadMenuById.Result>
}

export interface UpdateItemMenuRepository {
  update: (params: UpdateItemMenuRepository.Params) => Promise<UpdateItemMenuRepository.Result>
}
export interface SaveMenuRepository {
  save: (params: SaveMenuRepository.Params) => Promise<SaveMenuRepository.Result>
}

export interface DeleteItemMenuRepository {
  delete: (params: DeleteItemMenuRepository.Params) => Promise<void>
}

export namespace DeleteItemMenuRepository {
  export type Params = {
    itemId: string
  }
}

export namespace UpdateItemMenuRepository {
  export type Params = {
    itemId: string
    name?: string
    description?: string
    price?: number
  }

  export type Result = Error | Menu
}

export namespace LoadMenuById {
  export type Params = {
    itemId: string
  }

  export type Result = null | Menu
}

export namespace LoadMenuByNAmeAndRestaurantId {
  export type Params = {
    name: string
    restaurantId: string
  }

  export type Result = undefined | Menu
}

export namespace SaveMenuRepository {
  export type Params = {
    name: string
    description?: string
    price: number
    restaurantId: string
  }
  export type Result = undefined | Menu
}

export interface LoadMenuByRestaurantId {
  loadByRestaurantId: (params: LoadMenuByRestaurantId.Params) => Promise<LoadMenuByRestaurantId.Result>
}

export namespace LoadMenuByRestaurantId {
  export type Params = {
    restaurantId: string
  }

  export type Result = undefined |
  {
    id: string
    name: string
    description: string | null
    price: number
    restaurantId: string
    restaurant: {
      id: string
      name: string
    }
  }

}
