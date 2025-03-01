
import { getPetByIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getPetById = async (uuid: string) =>
  safeExecute(() => getPetByIdRepository(uuid), 'Can not get pet.')