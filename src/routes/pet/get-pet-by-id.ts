import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getEventsByPetId, getPetById as getPet } from '../../functions'
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
    id: z.string(),
  }),
//   response: {
//     200: response,
//   },
}

export const getPetById: FastifyPluginAsyncZod =
  async app => {
    app.get('/pet/:id', { schema: userSchema }, async (request, reply) => {
      const { id } = request.params

      const res: Response<Pet[]> = await getPet(id)

      if (res.data) {
        await Promise.all(res.data.map(async pet => {
          if (pet.id === undefined) return
          
          const eventsResponse = await getEventsByPetId(pet.id)
          
          pet.events = eventsResponse.data || []
          
          console.log('events', pet.events)
        }))
      }
      return reply.send(res)
    })
  }