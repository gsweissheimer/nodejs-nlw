import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getSubscriberInvitesClicks } from '../functions/'

export const getSubscriberInvitesClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/subscribers/:subscriberId/ranking/clicks',
      {
        schema: {
          summary: 'Get subscriber invites clicks',
          description: 'Get subscriber invites clicks',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesClicks({ subscriberId })

        return { count }
      }
    )
  }