import { addEventIdSchema } from './addEventIdSchema'
import { deletePetSchema } from './deletePetSchema'
import { getEventsListEventsSchema } from './getEventsListEventsSchema'
import { updatePetSchema } from './petSchema'
import { responseSchema } from './responseSchema'
import { userFullSchema } from './userFullSchema'

export {
  getEventsListEventsSchema as listEventsSchema,
  responseSchema,
  userFullSchema,
  deletePetSchema,
  updatePetSchema,
  addEventIdSchema,
}