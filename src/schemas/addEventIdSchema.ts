import { z } from 'zod'
import { EntityTypeEnum, EventTypeEnum } from '../models/'
import { responseSchema } from './responseSchema'

const data = z.object({
  id: z.string(),
})

export const addEventIdSchema = {
    summary: 'Add Event Route',
    description: 'Route to Add event to pet or family.',
    tags: ['event'],
    body: z.object({
        name: z.string(),
        value: z.string(),
        type: EventTypeEnum,
        entityId: z.string(),
        entityType: EntityTypeEnum,
        eventDate: z.string(),
    }),
    response: {
        201: responseSchema(data),
    },
}