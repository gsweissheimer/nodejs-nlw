import { pgTable, uuid } from 'drizzle-orm/pg-core'

import { family } from './family'
import { tutor } from './tutor'

export const familyTutor = pgTable('family_tutor', {
  id: uuid('id').primaryKey().defaultRandom(),
  familyId: uuid('family_id')
    .notNull()
    .references(() => family.id),
  tutorId: uuid('tutor_id')
    .notNull()
    .references(() => tutor.id),
})
