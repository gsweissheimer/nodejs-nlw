
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createHistory } from '../../functions/'
import { createHistorySchema } from '../../schemas/'
import { HistoryItem } from '../../models';

export const createHistoryForPet: FastifyPluginAsyncZod = async app => {
  app.post('/history/create', { schema: createHistorySchema }, async (request, reply) => {
    const { eventDate,  petId,  eventType,  eventTypeLabel,  name  } = request.body;
    const res = await createHistory({
        name,
        eventType,
        eventTypeLabel,
        petId,
        eventDate: eventDate,
    } as HistoryItem);
    if (res.hasError || res.data == null) {
      throw new Error(res.message);
    }
    return reply.send(res);
  });
}
