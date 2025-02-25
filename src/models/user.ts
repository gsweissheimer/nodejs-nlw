export interface User {
  id: string
  username: string
  password: string
  tutorId: string | null
  createdAt: Date
  updatedAt: Date | null
}
