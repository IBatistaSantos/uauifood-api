import { adaptExpressMiddleware } from '../adapters'
import { makeCanMiddleware } from '../factories/middlewares/can'

const canMiddleware = makeCanMiddleware()

export const can = adaptExpressMiddleware(canMiddleware)
