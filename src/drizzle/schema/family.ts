import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { tutor } from './tutor'

export const family = pgTable('family', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  tutorId: uuid('tutor_id')
    .notNull()
    .references(() => tutor.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
