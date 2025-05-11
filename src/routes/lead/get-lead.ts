
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getLeads } from '../../functions/'
import type { Response } from '../../models/'
import { getLeadsSchema } from '../../schemas/'

export const getAllLeads: FastifyPluginAsyncZod = async app => {
  app.get('/lead', { schema: getLeadsSchema },
      async (request, reply) => {
          const res: Response = await getLeads()

          if (res.hasError || res.data == null) {
              throw new Error(res.message)
          }

          return reply.status(201).send(res)
        }
  )
}
    