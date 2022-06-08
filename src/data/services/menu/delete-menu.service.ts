
import { LoadMenuById, DeleteItemMenuRepository } from '@/data/contracts/repos'
import { DeleteMenu } from '@/domain/features'

export class DeleteMenuService implements DeleteMenu {
  constructor (private readonly menuRepository: LoadMenuById & DeleteItemMenuRepository) {}
  async execute (params: DeleteMenu.Params): Promise<void> {
    await this.menuRepository.delete({
      itemId: params.itemId
    })
  }
}
