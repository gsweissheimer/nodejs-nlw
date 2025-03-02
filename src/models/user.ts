import type { FamilyFull, Pet } from '../models'
export interface User {
  id: string
  username: string
  password: string
  tutorId: string | null
  createdAt: Date
  updatedAt: Date | null
}
export interface UserMin {
  id: string
  username: string
  tutorId: string | null
}
export interface UserFull {
  id?: string
  name?: string
  email?: string
  tutorId: string | null
  pets?: Pet[]
  family?: FamilyFull
}