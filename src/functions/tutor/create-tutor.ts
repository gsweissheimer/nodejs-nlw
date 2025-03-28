
import type { Response, Tutor } from '../../models'
import { createTutorRepository } from '../../repository/tutorRepository'
import { safeExecute } from '../../utils/safeExecute'

export const createTutor = async (
  name: string,
  cpf: string,
  email: string
): Promise<Response<Tutor>> =>
  safeExecute(
    () => createTutorRepository(name, cpf, email),
    'Can not create pet.'
  )