import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.boolean()

export const getLeadSchema = {
  summary: 'Get Lead Route',
  description: 'Route to get all Leads.',
  tags: ['lead'],
  response: {
    201: responseSchema(data),
  },
}