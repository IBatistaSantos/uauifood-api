
export interface ListRestaurant {
  execute: () => Promise<ListRestaurant.Result>
}

export namespace ListRestaurant {
  export type Result = Error | Array<{
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
