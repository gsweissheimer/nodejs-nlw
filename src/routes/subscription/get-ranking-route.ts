import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getRanking } from '../../functions';
import { authenticateUser } from  '../../middleware/authenticator'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        description: 'Get ranking',
        tags: ['referral'],
        response: {
          200: z.object({
            ranking: z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    score: z.number(),
                })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking()

      return { ranking : rankingWithScore } 
    }
  )
}
