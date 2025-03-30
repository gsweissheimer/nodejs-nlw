import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  getEventsByTutorId as getEvents,
  getEventsByPetId as getEventsByPet,
} from '../../functions/'
import type { Event, Response } from '../../models/'
import { listEventsSchema } from '../../schemas';

export const getEventsByTutorId: FastifyPluginAsyncZod = async app => {
  app.get(
    '/event/:id',
    { schema: listEventsSchema },
    async (request, reply) => {
      const { id } = request.params

      const res: Response<Event[]> = await getEvents(id)

      return reply.send(res)
    }
  )
}

export const getEventsByPetId: FastifyPluginAsyncZod = async app => {
  app.get(
    '/event/pet/:id',
    { schema: listEventsSchema },
    async (request, reply) => {
      const { id } = request.params

      const res: Response<Event[]> = await getEventsByPet(id)

      return reply.send(res)
    }
  )
}
