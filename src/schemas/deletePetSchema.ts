import { z } from 'zod'
import { EntityTypeEnum, EventTypeEnum } from '../models/'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.boolean(),
})

export const deletePetSchema = {
  summary: 'Archive Pet Route',
  description: 'Route to archive pet.',
  tags: ['pet'],
  params: z.object({
    id: z.string(),
  }),
  response: {
    201: responseSchema(data),
  },
}