export interface DeleteMenu {
  execute: (menu: DeleteMenu.Params) => Promise<void>
}

export namespace DeleteMenu {
  export type Params = {
    itemId: string
    restaurantId: string
  }

}
