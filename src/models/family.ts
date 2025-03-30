import type { UserFull } from "../models/user";

export interface Family {
  id: string
  name: string
  tutorId: string
  createdAt: Date
  updatedAt: Date | null
}
export interface FamilyFull {
  id: string
  name: string
  users: UserFull[]
}