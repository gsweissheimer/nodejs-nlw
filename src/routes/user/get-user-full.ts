import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getUserBFF } from '../../functions'
import type { Response, UserFull } from '../../models/'
import { userFullSchema } from '../../schemas/userFullSchema'

export const getUserFullBFF: FastifyPluginAsyncZod = async app => {
  app.get('/user/:userId', { schema: userFullSchema }, async (request, reply) => {
    const { userId } = request.params

    const res: Response<UserFull> = await getUserBFF(userId)
    
    return reply.send(res)
  })
}