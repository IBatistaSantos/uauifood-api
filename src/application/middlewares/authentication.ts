import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { Middleware } from '@/application/middlewares'
import { RequiredFieldValidator } from '@/application/validation'

type HttpRequest = {
  headers: {
    authorization: string
  }
}

type Result = Error | { userId: string }

export type Authorize = (params: { token: string }) => Promise<string>

export class AuthenticationMiddleware implements Middleware {
  constructor (
    private readonly authorize: Authorize
  ) {}

  async handle ({ headers: { authorization } }: HttpRequest): Promise<HttpResponse<Result>> {
    if (this.validate(authorization)) {
      return unauthorized()
    }

    try {
      const userId = await this.authorize({ token: authorization })

      return ok({ userId })
    } catch {
      return unauthorized()
    }
  }

  private validate (authorization: string): boolean {
    const error = new RequiredFieldValidator(authorization, 'authorization').validate()

    if (error === undefined) {
      return false
    }
    return true
  }
}
