
import type { Event } from '../../models'
import { deleteEventByIdRepository } from '../../repository/'
import { safeExecute } from '../../utils/safeExecute'

export const deleteEventById = async (uuid: string) =>
  safeExecute(
    () => deleteEventByIdRepository(uuid),
    'Can not delete event.'
  )
