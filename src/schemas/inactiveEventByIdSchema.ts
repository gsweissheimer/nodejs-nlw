import { boolean } from 'zod'
import { responseSchema } from './responseSchema'

const data = boolean()

export const inactiveEventByIdSchema = {
  summary: 'Inactive Event Route',
  description: 'Route to Update event status to inactive.',
  tags: ['event'],
  response: {
    201: responseSchema(data),
  },
}