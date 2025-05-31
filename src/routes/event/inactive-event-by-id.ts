
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { inactiveEvent } from '../../functions'
import type { Response } from '../../models'
import { inactiveEventByIdSchema } from '../../schemas'

export const inactiveEventById: FastifyPluginAsyncZod = async app => {
  app.put(
    '/event/:id/inactive',
    { schema: inactiveEventByIdSchema },
    async (request, reply) => {

      const { id } = request.params as { id: string }

      const res: Response<boolean> = await inactiveEvent(id)

      if (res.hasError || res.data == null) {
        throw new Error(res.message)
      }

      return reply.send(res)
    }
  )
}
