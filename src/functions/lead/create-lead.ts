
import type { Lead } from '../../models/'
import { createLeadRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export interface Response {
  hasError: boolean
  message?: string
  lead?: Lead
}

export const createLead = async (lead: Lead): Promise<Response> =>
  safeExecute(() => createLeadRepository(lead), 'Can not create lead.')