
import { getPetsByTutorIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getPetsByTutorId = async (uuid: string) =>
  safeExecute(() => getPetsByTutorIdRepository(uuid), 'Can not get pet.')