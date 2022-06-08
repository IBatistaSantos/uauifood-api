// import { Menu } from '@/domain/entities'

export interface GetMenu {
  execute: (menu: GetMenu.Params) => Promise<GetMenu.Result>
}

export namespace GetMenu {
  export type Params = {
    restaurantId: string
  }

  export type Result = Error | Array<{
    id: string
    name: string
    description: string | null
    price: number
    restaurantId: string
    restaurant: {
      id: string
      name: string
    }
  }>
}
