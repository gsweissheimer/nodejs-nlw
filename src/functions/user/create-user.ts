
import type { User } from '../../models/user'
import { createUserRepository } from '../../repository/'

export interface Response {
  hasError: boolean
  message?: string
  user?: User
}


export const createUser = async (
  username: string,
  password: string,
  tutorId: string
): Promise<Response> => {
  try {
    const user = await createUserRepository(username, password, tutorId)
    return { hasError: false, user: user }
  } catch (error) {
    return { hasError: true, message: 'Can not create user.' }
  }
}