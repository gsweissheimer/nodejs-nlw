
import { GetHistoriesByPetIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getHistoriesByPetId = async (uuid: string) =>
  safeExecute(() => GetHistoriesByPetIdRepository(uuid), 'Can not get family.')