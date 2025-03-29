import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getEventsByTutorId as getEvents } from '../../functions/'
import type { Event, Response } from '../../models/'
import { listEventsSchema } from '../../schemas';

export const getEventsByTutorId: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/event/:id',
        { schema: listEventsSchema },
        async (request, reply) => {
            const { id } = request.params;

            const res: Response<Event[]> = await getEvents(id);

            return reply.send(res);
        }
    );
};
