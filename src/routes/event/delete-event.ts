import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from "zod";
import { deleteEventById as removeEvent } from '../../functions/'
import type { Event } from '../../models/';

const data = z.object({
    id: z.string(),
});

const response = z.object({
    hasError: z.boolean(),
    message: z.string().optional(),
    data: z.array(data).optional(),
});

export const deleteEvent: FastifyPluginAsyncZod = async app => {
    app.delete(
        '/event/delete/:id',
        {
            schema: {
                summary: 'Delete Event Route',
                description: 'Route to delete an event by ID.',
                tags: ['event'],
                params: z.object({
                    id: z.string(),
                }),
                // response: {
                //   200: response,
                // },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const res = await removeEvent(id);

            if (res.hasError || res.data == null) {
                throw new Error(res.message);
            }

            return reply.status(200).send(res);
        }
    );
};