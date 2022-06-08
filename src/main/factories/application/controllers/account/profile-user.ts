import { ProfileController } from '@/application/controllers'
import { makeProfileUser } from '@/main/factories/features'

export const makeProfileController = (): ProfileController => {
  return new ProfileController(makeProfileUser())
}
