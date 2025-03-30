
import type { Pet, Response } from '../../models/'
import { archivePetByIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const archivePetById = async (id: string): Promise<Response<boolean>> =>
  safeExecute(() => archivePetByIdRepository(id), 'Can not create pet.')