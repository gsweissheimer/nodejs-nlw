import { integer, pgTable, serial } from 'drizzle-orm/pg-core'

import { family } from './family'
import { tutor } from './tutor'

export const familyTutor = pgTable('family_tutor', {
    id: serial('id').primaryKey(),
    familyId: integer('family_id').notNull().references(() => family.id),
    tutorId: integer('tutor_id').notNull().references(() => tutor.id),
})
