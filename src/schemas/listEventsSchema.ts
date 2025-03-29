import { z } from 'zod'
import { responseSchema } from './responseSchema'

const data = z.array(
      z.object({
        id: z.string().optional(),
        name: z.string(),
        entityId: z.string(),
        entityType: z.string(),
        eventDate: z.date(),
        createdAt: z.date(),
        type: z.string(),
        value: z.string(),
      })
    .optional())

export const listEventsSchema = {
    summary: 'Get events',
    description: 'Get pets events filtering by its tutor id',
    tags: ['event'],
    params: z.object({
        id: z.string(),
    }),
    response: {
        200: responseSchema(data),
    },
}