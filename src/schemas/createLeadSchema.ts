import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  categoryId: z.number(),
  aBLandingpage: z.string(),
  createdAt: z.string(),
})

export const createLeadSchema = {
  summary: 'Create Lead Route',
  description: 'Route to create lead.',
  tags: ['lead'],
  body: z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    categoryId: z.number(),
    aBLandingpage: z.string(),
  }),
  response: {
    201: responseSchema(data),
  },
}