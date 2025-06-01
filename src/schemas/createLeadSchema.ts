import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.string(),
})

export const createHistorySchema = {
  summary: 'Create History Route',
  description: 'Route to create pet history.',
  tags: ['history'],
  body: z.object({
    eventDate: z.string().date(),
    petId: z.string(),
    eventType: z.enum([
      'feature_doctor',
      'feature_exam',
      'feature_vaccines',
      'feature_meds',
      'feature_erradicators',
    ]),
    eventTypeLabel: z.string(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  }),
  response: {
    201: responseSchema(data),
  },
}