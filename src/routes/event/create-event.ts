
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createEvent as addEvent } from '../../functions/'
import type { Event, Response } from '../../models/'
import { addEventIdSchema } from '../../schemas/'

export const createEvent: FastifyPluginAsyncZod = async app => {
  app.post('/event/add', { schema: addEventIdSchema }, async (request, reply) => {

      const { name, value, type, entityId, entityType, eventDate } = request.body

      const event: Event = {
        name: name,
        value: value,
        type: type,
        entityId: entityId,
        entityType: entityType,
        eventDate: new Date(eventDate),
        createdAt: new Date(),
      }
      console.log('event', event)
      const res: Response<string> = await addEvent(event)
      
      if (res.hasError || res.data == null) {
        throw new Error(res.message)
      }

      return reply.send(res)
    }
  )
}
