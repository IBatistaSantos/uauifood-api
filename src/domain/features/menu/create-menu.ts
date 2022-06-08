import { Menu } from '@/domain/entities'

export interface CreateMenu {
  execute: (menu: CreateMenu.Params) => Promise<CreateMenu.Result>
}

export namespace CreateMenu {
  export type Params = {
    name: string
    description: string | null
    price: number
    restaurantId: string
  }

  export type Result = Error | Menu
}
