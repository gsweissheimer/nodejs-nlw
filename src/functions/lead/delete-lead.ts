
import { deleteLeadByIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const deleteLeadById = async (id: number) =>
  safeExecute(() => deleteLeadByIdRepository(id), 'Can not delete lead.')
