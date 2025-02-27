import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { answerMessage } from '../../functions'

const data = z.object({
  answer: z.string().optional().nullable(),
})

const response = z.object({
  hasError: z.boolean(),
  message: z.string().optional().nullable(),
  data: data.optional(),
})

const userSchema = {
  summary: 'AI consulting',
  description: 'Send a message to AI',
  tags: ['ai'],
  body: z.object({
    message: z.string(),
  }),
  response: {
    200: response,
  },
}

export const sendMessageToAI: FastifyPluginAsyncZod =
  async app => {
    app.post('/ai/message/',
      { schema: userSchema },
      async (request, reply) => {

        const { message } = request.body

        const answer = await answerMessage(message)

        return answer

      }
    )
  }