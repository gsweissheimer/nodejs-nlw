import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.string(),
})

export const createLeadSchema = {
  summary: 'Create History Route',
  description: 'Route to create pet history.',
  tags: ['history'],
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    categoryId: z.number(),
    aBLandingpage: z.string(),
    createdAt:  z.string().optional().default(new Date().toISOString()),
  }),
  response: {
    201: responseSchema(data),
  },
}