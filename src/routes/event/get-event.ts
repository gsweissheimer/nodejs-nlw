import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  getEventsByTutorId as getEvents,
  getEventsByPetId as getEventsByPet,
} from '../../functions/'
import type { Event, Response } from '../../models/'
import { getPetByIdRepository } from '../../repository/petRepository';
import { getEventsListEventsSchema } from '../../schemas'

export const getEventsByTutorId: FastifyPluginAsyncZod = async app => {
  app.get('/event/:id', { schema: getEventsListEventsSchema },
    async (request, reply) => {
      const { id } = request.params
      const res: Response<Event[]> = await getEvents(id)
      return reply.send(res)
    }
  )
}

export const getEventsByPetId: FastifyPluginAsyncZod = async app => {
  app.get('/event/pet/:id', { schema: getEventsListEventsSchema },
    async (request, reply) => {
      const { id } = request.params
      const res: Response<Event[]> = await getEventsByPet(id)
      if (res.data) {
        await Promise.all(
          res.data.map(async (event) => {
            const response = await getPetByIdRepository(event.entityId);
            event.tooltip = response.name;
          })
        );
      }
      return reply.send(res);
    }
  )
}
