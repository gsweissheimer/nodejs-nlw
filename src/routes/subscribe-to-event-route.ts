import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { subscribeToEvent } from '../functions/';

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
    app.post(
      '/subscriptions',
      {
        schema: {
          summary: 'Subscribe to an event',
          description: 'Subscribe to an event by providing your name and email',
          tags: ['subscriptions'],
          body: z.object({
            name: z.string().min(2),
            email: z.string().email(),
            referrer: z.string().nullish(),
          }),
          response: {
            201: z.object({
              subscriberId: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { name, email, referrer } = request.body

        const { subscriberId } = await subscribeToEvent({ name, email, referrerId: referrer })

        return reply.status(201).send({ subscriberId })
      }
    )
}
