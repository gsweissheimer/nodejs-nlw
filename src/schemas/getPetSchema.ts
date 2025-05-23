import { z } from 'zod'
import { responseSchema } from './responseSchema'

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

export const getPetSchema = {
  summary: 'Get pets',
  description: 'Get pets filtering by its tutor id',
  tags: ['pet'],
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: responseSchema(data),
  },
}