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
  type: text('type').notNull(),
  breedId: uuid('breed_id').references(() => breed.id),
  tutorId: uuid('tutor_id').references(() => tutor.id),
  birthDate: date('birth_date'),
  microchip: boolean('microchip').default(false),
  isActive: boolean('is_active').default(true),
  angel: boolean('angel').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
