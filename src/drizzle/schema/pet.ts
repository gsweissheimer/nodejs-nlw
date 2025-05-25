import {
  boolean,
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
  isVaccinated: boolean('is_vaccinated').default(false).notNull(),
  isCastrated: boolean('is_castrated').default(false).notNull(),
  isFiev: boolean('is_fiev').default(false).notNull(),
  isFelv: boolean('is_felv').default(false).notNull(),
  angel: boolean('angel').default(false).notNull(),
  dewormedExpirationDate: timestamp('dewormed_expiration_date'),
  antiFleaExpirationDate: timestamp('anti_flea_expiration_date'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
