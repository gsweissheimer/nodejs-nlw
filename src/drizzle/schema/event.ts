import { pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const mySchema = pgSchema('my_schema')

export const event_types = mySchema.enum('event_types', ['event', 'appointment'])

export const entity_types = mySchema.enum('entity_types', [
  'pet',
  'tutor',
  'family',
])

export const event = pgTable('event', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: event_types('type').notNull(),
  entity_id: uuid('entity_id').notNull(),
  entity_type: text('entity_type').notNull(),
  event_date: timestamp('event_date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})