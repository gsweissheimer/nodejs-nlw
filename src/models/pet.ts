import type { Event, HistoryItem } from '../models/'
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
  isVaccinated: boolean
  isCastrated: boolean
  isFiev: boolean
  isFelv: boolean
  dewormedExpirationDate: Date | null
  antiFleaExpirationDate: Date | null
  angel: boolean
  createdAt: Date
  updatedAt?: Date | null
  history?: HistoryItem[]
}

export interface PetEvent {
  events?: Event[]
}

export interface PetUX {
  color?: string
}