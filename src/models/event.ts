import z from "zod"

export const EventTypeEnum = z.enum(['event', 'appointment'])
export const EntityTypeEnum = z.enum(['user', 'pet', 'family'])

export type EntityType = z.infer<typeof EntityTypeEnum>
export type EventType = z.infer<typeof EventTypeEnum>

export interface Event {
  id?: string
  name: string
  type: EventType
  entityId: string
  entityType: EntityType
  eventDate: Date
  createdAt: Date
}