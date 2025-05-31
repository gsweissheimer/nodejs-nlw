
import { inactiveEventsByIdRepository } from '../../repository/'
import { safeExecute } from '../../utils/safeExecute'

export const inactiveEvent = async (id: string) =>
  safeExecute(() => inactiveEventsByIdRepository(id), 'Can not create event.')
