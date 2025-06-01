import { pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const mySchema = pgSchema('my_schema')

export const event_type = mySchema.enum('event_type', [
    'feature_doctor',
    'feature_exam',
    'feature_vaccines',
    'feature_meds',
    'feature_erradicators',
])

export const petHistory = pgTable('pet_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').notNull(),
  eventDate: timestamp('event_date').notNull(),
  eventType: event_type('event_type').notNull(),
  eventTypeLabel: text('event_type_label').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
