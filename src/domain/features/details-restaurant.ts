import { Restaurant } from '../entities'

export interface DetailsRestaurant {
  execute: (params: DetailsRestaurant.Params) => Promise<DetailsRestaurant.Result>
}

export namespace DetailsRestaurant {
  export type Params = {
    restaurantId: string
  }
  export type Result = Error | Restaurant
}
