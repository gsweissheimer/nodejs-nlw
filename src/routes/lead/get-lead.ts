
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getLeads } from '../../functions/'
import { getLeadsSchema } from '../../schemas/'

export const getAllLeads: FastifyPluginAsyncZod = async app => {
  app.get('/lead', { schema: getLeadsSchema }, async (request, reply) => {
    return await getLeads()
  })
}
    