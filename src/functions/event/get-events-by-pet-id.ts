
import { getEventsByPetIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getEventsByPetId = async (uuid: string) =>
  safeExecute(() => getEventsByPetIdRepository(uuid), 'Can not get pet events.')