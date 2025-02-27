
import type { Pet } from '../../models/pet'
import { createPetRepository } from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export interface Response {
  hasError: boolean
  message?: string
  pet?: Pet
}

export const createPet = async (newPet: Pet): Promise<Response> =>
  safeExecute(() => createPetRepository(newPet), 'Can not create pet.')