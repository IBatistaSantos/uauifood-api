
export interface DeleteRestaurant {
  execute: (params: DeleteRestaurant.Params) => Promise<void>
}

export namespace DeleteRestaurant {
  export type Params = {
    restaurantId: string
  }
}
