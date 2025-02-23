import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

import { breed } from './breed'
import { tutor } from './tutor'

export const pet = pgTable('pet', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  breedId: integer('breed_id').references(() => breed.id),
  tutorId: integer('tutor_id').references(() => tutor.id),
  birthDate: date('birth_date'),
  microchip: boolean('microchip').default(false),
  isActive: boolean('is_active').default(true),
  angel: boolean('angel').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
