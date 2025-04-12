import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  pet: z.object({
    id: z.string().optional(),
    color: z.string(),
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
})

export const updatePetSchema = {
  summary: 'Update Pet Route',
  description: 'Route to Update pet.',
  tags: ['pet'],
  body: z.object({
    id: z.string(),
    color: z.string(),
    name: z.string(),
    type: z.string(),
    breedId: z.string(),
    tutorId: z.string(),
    birthDate: z.string(),
    microchip: z.boolean(),
  }),
  response: {
    201: responseSchema(data),
  },
}