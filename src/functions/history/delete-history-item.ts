
import { DeleteHistoryItemByIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const deleteHistoryItemById = async (uuid: string) =>
  safeExecute(() => DeleteHistoryItemByIdRepository(uuid), 'Can not delete historyitem.')
