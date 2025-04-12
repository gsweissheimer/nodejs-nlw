import {
  boolean,
  date,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { breed } from './breed'
import { tutor } from './tutor'

export const pet = pgTable('pet', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  color: text('color').notNull().default('#45a8eb'),
  type: text('type').notNull(),
  breedId: uuid('breed_id')
    .references(() => breed.id)
    .notNull(),
  tutorId: uuid('tutor_id')
    .references(() => tutor.id)
    .notNull(),
  birthDate: timestamp('birth_date').notNull(),
  microchip: boolean('microchip').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  angel: boolean('angel').default(false).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
