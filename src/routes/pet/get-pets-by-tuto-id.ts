import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getPetsByTutorId as getPet } from '../../functions'
import type { Pet } from '../../models'
import type { Response } from '../../models'

const data = z.object({
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
  isVaccinated: z.boolean().optional(),
  isCastrated: z.boolean().optional(),
  isFiev: z.boolean().optional(),
  isFelv: z.boolean().optional(),
  dewormedExpirationDate: z.date().nullable().optional(),
  antiFleaExpirationDate: z.date().nullable().optional(),
})

const response = z.object({
    hasError: z.boolean(),
    message: z.string().optional(),
    data: z.array(data).optional(),
})

const userSchema = {
  summary: 'Get pets',
  description: 'Get pets filtering by its tutor id',
  tags: ['pet'],
  params: z.object({
    tutorId: z.string(),
  }),
  response: {
    200: response,
  },
}

export const getPetsByTutorId: FastifyPluginAsyncZod =
  async app => {
    app.get('/pets/:tutorId',
      { schema: userSchema },
      async (request, reply) => {

        const { tutorId } = request.params

        const res: Response<Pet[]> = await getPet(tutorId)

        return reply.send(res)

      }
    )
  }