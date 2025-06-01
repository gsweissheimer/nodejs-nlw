import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.boolean(),
})

export const deleteHistoryItemSchema = {
  summary: 'Delete History Item Route',
  description: 'Route to delete history item.',
  tags: ['history'],
  params: z.object({
    id: z.string(),
  }),
  response: {
    201: responseSchema(data),
  },
}