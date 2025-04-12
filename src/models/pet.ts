import type { Event } from '../models/'
export interface Pet extends PetEvent, PetUX {
  id?: string
  name: string
  type: string
  color: string
  breedId: string
  tutorId: string
  birthDate: Date
  microchip: boolean
  isActive: boolean
  angel: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export interface PetEvent {
  events?: Event[]
}

export interface PetUX {
  color?: string
}