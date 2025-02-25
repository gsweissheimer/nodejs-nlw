export interface Tutor {
  id?: string
  name: string
  cpf: string
  email: string
  isActive: boolean | null
  createdAt: Date
  updatedAt: Date | null
}
