import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";

import { accessInviteLinks } from '../../functions/';

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
    app.get(
      '/invites/:subscriberId',
      {
        schema: {
          summary: 'Acess invite link and redirect user',
          description: 'Acess invite link and redirect user',
          tags: ['referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            201: z.object({
              subscriberId: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        await accessInviteLinks({ subscriberId })

        const redirectUrl = new URL(process.env.WEB_URL as string)

        redirectUrl.searchParams.set('referrer', subscriberId)

        return reply.redirect(redirectUrl.toString(), 302)
      }
    )
}
