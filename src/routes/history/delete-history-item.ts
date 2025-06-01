import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { deleteHistoryItemById } from '../../functions'
import { deleteHistoryItemSchema } from '../../schemas/'

export const deleteHistoryItem: FastifyPluginAsyncZod = async app => {
    app.delete('/history/:id', { schema:  deleteHistoryItemSchema },
        async (request, reply) => {
            const { id } = request.params;

            const res = await deleteHistoryItemById(id)

            if (res.hasError || res.data == null) {
                throw new Error(res.message);
            }

            return reply.status(200).send(res);
        }
    );
};