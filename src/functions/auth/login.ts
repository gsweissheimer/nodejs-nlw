import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import type { User } from '../../models/user'
import { getUserByUsernameRepository } from '../../repository/userRepository'

export interface Response {
  hasError: boolean
  message: string
  user?: User
}


export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  try {
    const user = await getUserByUsernameRepository(username)
    return user
  } catch (error) {
    throw error.message
  }
}

export const verifyUserNameAndPassword = async (
  username: string,
  password: string
): Promise<Response> => {
  if (!username || !password)
    return { hasError: true, message: 'Usuário ou senha inválida' }

  const user = await getUserByUsername(username)

  if (user) return verifyPassword(password, user)

  return { hasError: true, message: 'Usuário ou senha inválida' }
}

export const verifyPassword = async (
  password: string,
  user: User
): Promise<Response> => {
  
  const compared = await bcrypt.compare(password, user.password)
  if (compared) return { hasError: false, message: '', user: user }

  return { hasError: true, message: 'Usuário ou senha inválida' }
}


export const generateToken = (user: User) => {
  dotenv.config()
  const SECRET_KEY = process.env.SECRET_KEY as string

  const options = {
    expiresIn: 3600,
  }

  return { token: `Bearer ${jwt.sign(user, SECRET_KEY, options)}` }
}