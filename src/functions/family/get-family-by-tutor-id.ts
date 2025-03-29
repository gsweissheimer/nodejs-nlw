
import { getFamilyByTutorIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getFamilyByTutorId = async (uuid: string) =>
  safeExecute(() => getFamilyByTutorIdRepository(uuid), 'Can not get family.')