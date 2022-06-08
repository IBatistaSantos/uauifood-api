import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'

type HttpRequest = {
  params: {
    restaurantId: string
  }
  locals: {
    userId: string
  }
}

type Result = Error | { userId: string }

export type IsOwnerOrEmployeRestaurant = (params: { userId: string, restaurantId: string }) => Promise<boolean>

export class IsOwnerOrEmployeMiddleware implements Middleware {
  constructor (
    private readonly restaurantRepository: IsOwnerOrEmployeRestaurant
  ) {}

  async handle ({ params, locals }: HttpRequest): Promise<HttpResponse<Result>> {
    const { restaurantId } = params
    const { userId } = locals

    try {
      const isOwnerOrEmploye = await this.restaurantRepository({
        userId,
        restaurantId
      })

      if (!isOwnerOrEmploye) {
        return unauthorized()
      }

      return ok({ userId })
    } catch {
      return unauthorized()
    }
  }
}
