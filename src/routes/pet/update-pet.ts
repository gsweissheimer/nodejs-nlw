import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updatePetById } from '../../functions/'
import type { Pet, Response } from '../../models/'
import { updatePetSchema } from '../../schemas/'

export const updatePet: FastifyPluginAsyncZod = async app => {
  app.put('/pet/', { schema: updatePetSchema }, async (request, reply) => {

    const { id, name, type, breedId, tutorId, birthDate, microchip } =
      request.body

    const res: Response = await updatePetById({
        id: id,
        name: name,
        type: type,
        breedId: breedId,
        tutorId: tutorId,
        birthDate: new Date(birthDate),
        microchip: microchip,
        isActive: true,
        angel: false,
        createdAt: new Date(),
    })

    if (res.hasError || res.data == null) {
      throw new Error(res.message)
    }

    return reply.send(res)
  })
}
