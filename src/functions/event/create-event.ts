
import type { Event } from '../../models'
import { createEventRepository } from '../../repository/'
import { safeExecute } from '../../utils/safeExecute'

export const createEvent = async (event: Event) =>
  safeExecute(() => createEventRepository(event), 'Can not create event.')
