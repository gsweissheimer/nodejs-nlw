import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  leads: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        categoryId: z.number(),
        aBLandingpage: z.string(),
        createdAt: z.date(),
      })
    )
})

export const getLeadsSchema = {
  summary: 'Get all leads',
  description: 'Get all leads',
  tags: ['lead'],
  response: {
    200: responseSchema(data),
  },
}