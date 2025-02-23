import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

import { tutor } from './tutor'

export const family = pgTable('family', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    tutorId: integer('tutor_id').notNull().references(() => tutor.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
