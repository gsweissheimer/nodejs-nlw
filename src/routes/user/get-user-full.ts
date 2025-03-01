import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getUserBFF } from '../../functions'
import type { Response, UserFull } from '../../models/'

const data = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  pets: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        type: z.string(),
        breedId: z.string(),
        tutorId: z.string(),
        birthDate: z.date(),
        microchip: z.boolean(),
        isActive: z.boolean(),
        angel: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date().nullable().optional(),
      })
    )
    .optional(),
  family: z
    .object({
      id: z.string().optional(),
      name: z.string(),
    })
    .optional(),
})

const response = z.object({
    hasError: z.boolean(),
    message: z.string().optional(),
    data: data.optional(),
})

const userSchema = {
  summary: 'Get user by id',
  description: 'Get user full info to populate dashboard',
  tags: ['user'],
  params: z.object({
    userId: z.string(),
  }),
  // response: {
  //   200: response,
  // },
}

export const getUserFullBFF: FastifyPluginAsyncZod = async app => {
  app.get('/user/:userId', { schema: userSchema }, async (request, reply) => {
    const { userId } = request.params

    const res = await getUserBFF(userId)

    return reply.send(res)
  })
}