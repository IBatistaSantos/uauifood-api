import { Restaurant, TypeCuisine } from '../../entities'

export interface UpdateRestaurant {
  execute: (params: UpdateRestaurant.Params) => Promise<UpdateRestaurant.Result>
}

export namespace UpdateRestaurant {
  export type Params = {
    restaurantId: string
    name?: string
    typeCuisine?: TypeCuisine
  }
  export type Result = Error | Restaurant
}
