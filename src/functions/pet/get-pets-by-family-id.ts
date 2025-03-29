
import { getPetsByFamilyIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getPetsByFamilyId = async (uuid: string) =>
  safeExecute(() => getPetsByFamilyIdRepository(uuid), 'Can not get pet.')