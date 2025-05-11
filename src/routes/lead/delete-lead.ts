import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from "zod";
import { deleteLeadById } from '../../functions'
import { deleteLeadSchema } from '../../schemas/'

export const deleteLead: FastifyPluginAsyncZod = async app => {
    app.delete(
        '/lead/:id', { schema:  deleteLeadSchema },
        async (request, reply) => {
            const { id } = request.params;

            const res = await deleteLeadById(Number(id))

            if (res.hasError || res.data == null) {
                throw new Error(res.message);
            }

            return reply.status(200).send(res);
        }
    );
};