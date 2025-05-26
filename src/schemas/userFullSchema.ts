import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  tutorId: z.string().nullable().optional(),
  pets: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        type: z.string(),
        color: z.string(),
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
    )
    .optional(),
  family: z
    .object({
      id: z.string(),
      name: z.string(),
      users: z.array(
        z.object({
          id: z.string().optional(),
          name: z.string().optional(),
          email: z.string().optional(),
          tutorId: z.string().nullable().optional(),
          pets: z
            .array(
              z.object({
                id: z.string().optional(),
                name: z.string(),
                type: z.string(),
                color: z.string(),
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
            )
            .optional(),
        })
      ),
    })
    .optional(),
})

export const userFullSchema = {
  summary: 'Get user by id',
  description: 'Get user full info to populate dashboard',
  tags: ['user'],
  params: z.object({
    userId: z.string(),
  }),
  response: {
    200: responseSchema(data),
  },
}