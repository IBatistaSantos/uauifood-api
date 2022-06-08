import { Menu } from '@/domain/entities'

export interface UpdateMenu {
  execute: (menu: UpdateMenu.Params) => Promise<UpdateMenu.Result>
}

export namespace UpdateMenu {
  export type Params = {
    name?: string
    description?: string | null
    price?: number
    restaurantId: string
    itemId: string
  }

  export type Result = Error | Menu
}
