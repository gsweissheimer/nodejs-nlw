import { z } from 'zod'
import { EventActionLabel, EventActionType } from '../enums/petactions';
import { responseSchema } from './responseSchema'

const data = z.array(
  z.object({
    label: z.nativeEnum(EventActionLabel),
    value: z.nativeEnum(EventActionType),
    entity: z.string(),
    type: z.string()
  })
);

export const getEventsSchema = {
  summary: 'Get pet events',
  description: 'Get all events available for pets',
  tags: ['event'],
  response: {
    200: responseSchema(data),
  },
}