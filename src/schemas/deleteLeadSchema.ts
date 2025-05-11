import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.boolean()

export const deleteLeadSchema = {
  summary: 'Delete Lead Route',
  description: 'Route to delete Lead.',
  tags: ['lead'],
  params: z.object({
    id: z.string(),
  }),
  response: {
    201: responseSchema(data),
  },
}