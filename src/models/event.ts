import { pgSchema } from 'drizzle-orm/pg-core'
import z from "zod"

export const mySchema = pgSchema('my_schema')

export const EventTypeEnum = z.enum(['event', 'appointment', 'notification'])
export const EntityTypeEnum = z.enum(['pet', 'tutor', 'family'])

export type EntityType = z.infer<typeof EntityTypeEnum>
export type EventType = z.infer<typeof EventTypeEnum>

export interface Event {
  id?: string
  name: string
  value: string
  tooltip?: string
  status?: string
  type: EventType
  entityId: string
  entityType: EntityType
  eventDate: Date
  createdAt: Date
}