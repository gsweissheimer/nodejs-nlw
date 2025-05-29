import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import type { EventAction } from '../../enums/petactions'
import { EventActions } from '../../enums/petactions'
import type { Response } from '../../models'
import { getEventsSchema } from '../../schemas/getEventsSchema'

const actions: EventAction[] = EventActions

export const getActions: FastifyPluginAsyncZod =
  async app => {
    app.get('/actions', { schema: getEventsSchema }, async (request, reply) => {
      const res: Response<EventAction[]> = { hasError: false, data: actions }
      return reply.send(res)
    })
  }