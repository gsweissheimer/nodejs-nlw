
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getLeads } from '../../repository/leadRepository'

export const getAllLeads: FastifyPluginAsyncZod = async app => {
  app.get('/lead', {}, async (request, reply) => {
    return await getLeads()
  })
}
    