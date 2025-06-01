
import type { HistoryItem } from '../../models'
import { CreateHistoryRepository } from '../../repository/'
import { safeExecute } from '../../utils/safeExecute'

export const createHistory = async (historyItem: HistoryItem) =>
  safeExecute(() => CreateHistoryRepository(historyItem), 'Can not create history.')
