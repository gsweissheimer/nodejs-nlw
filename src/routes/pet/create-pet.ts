import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { createPet as addPet } from '../../functions/index'
import type { Pet } from '../../models/'

export interface Response {
  hasError: boolean
  message?: string
  pet?: Pet
}

export const createPet: FastifyPluginAsyncZod = async app => {
  app.post(
    '/pet/add',
    {
      schema: {
        summary: 'Add Pet Rout',
        description: 'Route to Add pet to user.',
        tags: ['pet'],
        body: z.object({
          name: z.string(),
          type: z.string(),
          breedId: z.string(),
          tutorId: z.string(),
          birthDate: z.string(),
          microchip: z.boolean(),
        }),
        response: {
          201: z.object({
            pet: z.object({
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
              updatedAt: z.date().optional().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, type, breedId, tutorId, birthDate, microchip } =
        request.body
      
      const pet: Pet = {
        name: name,
        type: type,
        breedId: breedId,
        tutorId: tutorId,
        birthDate: new Date(birthDate),
        microchip: microchip,
        isActive: true,
        angel: false,
        createdAt: new Date(),
      }
      
      const res: Response = await addPet(pet)

      if (res.hasError || res.pet == null) {
        throw new Error(res.message)
      }

      return reply.status(201).send({ pet: res.pet })
    }
  )
}
