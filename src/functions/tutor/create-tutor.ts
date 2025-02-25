
import type { Tutor } from '../../models/tutor'
import { createTutorRepository } from '../../repository/tutorRepository'

export interface Response {
  hasError: boolean
  message?: string
  tutor?: Tutor
}


export const createTutor = async (
  name: string,
  cpf: string,
  email: string
): Promise<Response> => {
  try {
    const tutor = await createTutorRepository(name, cpf, email)
    return { hasError: false, tutor: tutor }
  } catch (error) {
    return { hasError: true, message: 'Can not create tutor.' }
  }
}