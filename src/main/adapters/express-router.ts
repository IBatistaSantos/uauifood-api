import { Controller } from '@/application/controllers'
import { Response, Request, RequestHandler } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req: Request, res: Response) => {
  const { statusCode, data } = await controller.handle({ ...req.body, ...req.params })
  const json = statusCode === 200 ? data : { error: data.message }
  res.status(statusCode).json(json)
}
