import { pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const mySchema = pgSchema('my_schema')

export const event_types = mySchema.enum('event_types', [
  'event',
  'appointment',
  'notification',
  'consultation',
  'examination',
])

export const entity_types = mySchema.enum('entity_types', [
  'pet',
  'tutor',
  'family',
])

export const event = pgTable('event', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  value: text('value').notNull(),
  type: event_types('type').notNull(),
  status: text('status').notNull().default('active'),
  entityId: uuid('entity_id').notNull(),
  entityType: entity_types('entity_type').notNull(),
  eventDate: timestamp('event_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})