import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getHistoriesByPetId, getEventsByPetId, getPetById as getPet } from '../../functions'
import type { Pet } from '../../models'
import type { Response } from '../../models'
import { getPetSchema } from '../../schemas'



export const getPetById: FastifyPluginAsyncZod =
  async app => {
    app.get('/pet/:id', { schema: getPetSchema }, async (request, reply) => {
      const { id } = request.params
      const res: Response<Pet> = await getPet(id)
      const pet: Pet | null = res.data ?? null
      if (pet != null) {
        if (pet.id === undefined) return
        const eventsResponse = await getEventsByPetId(pet.id)
        pet.events = eventsResponse.data || []
        const historyResponse = await getHistoriesByPetId(pet.id)
        pet.history = historyResponse.data || []
      }
      return reply.send(res)
    })
  }