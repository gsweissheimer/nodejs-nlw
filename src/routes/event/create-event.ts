import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { createEvent as addEvent } from '../../functions/'
import type { Event } from '../../models/'
import { EntityTypeEnum, EventTypeEnum } from '../../models/'

const data = z.object({
  id: z.string(),
})

const response = z.object({
  hasError: z.boolean(),
  message: z.string().optional(),
  data: z.array(data).optional(),
})

export const createEvent: FastifyPluginAsyncZod = async app => {
  app.post(
    '/event/add',
    {
      schema: {
        summary: 'Add Event Rout',
        description: 'Route to Add event to pet or family.',
        tags: ['event'],
        body: z.object({
          name: z.string(),
          type: EventTypeEnum,
          entityId: z.string(),
          entityType: EntityTypeEnum,
          eventDate: z.string(),
        }),
        // response: {
        //   201: response,
        // },
      },
    },
    async (request, reply) => {
      const { name, type, entityId, entityType, eventDate } = request.body

      const event: Event = {
        name: name,
        type: type,
        entityId: entityId,
        entityType: entityType,
        eventDate: new Date(eventDate),
        createdAt: new Date(),
      }

      const res = await addEvent(event)
      //   const res: Response<string> = await addEvent(event)

      if (res.hasError || res.data == null) {
        throw new Error(res.message)
      }

      return reply.status(201).send(res)
    }
  )
}
