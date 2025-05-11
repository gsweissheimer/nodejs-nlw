
import { getLeads as getLeadsRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getLeads = async () =>
  safeExecute(() => getLeadsRepository(), 'Can not get lead.')
