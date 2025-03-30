
import type { Pet, Response } from '../../models/'
import { updatePetByIdRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const updatePetById = async (pet: Pet): Promise<Response<Pet>> =>
  safeExecute(() => updatePetByIdRepository(pet), 'Can not update pet.')