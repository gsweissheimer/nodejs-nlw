export interface Pet {
  id?: string
  name: string
  type: string
  breedId: string
  tutorId: string
  birthDate: Date
  microchip: boolean
  isActive: boolean
  angel: boolean
  createdAt: Date
  updatedAt?: Date | null
}