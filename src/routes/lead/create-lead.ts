import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createLead } from '../../functions/'
import type { Lead, Response } from '../../models/'
import { createLeadSchema } from '../../schemas/';

export const addLead: FastifyPluginAsyncZod = async app => {
  app.post(
    '/lead/add', { schema: createLeadSchema },
        async (request, reply) => {
            const { name, email, phone, categoryId, aBLandingpage } = request.body

            const lead: Lead = {
              name,
              email,
              phone,
              categoryId,
              aBLandingpage,
              createdAt: new Date().toISOString(),
            }

            const res: Response = await createLead(lead)

            if (res.hasError || res.data == null) {
                throw new Error(res.message)
            }

            return reply.status(201).send(res)
          }
  )
}
