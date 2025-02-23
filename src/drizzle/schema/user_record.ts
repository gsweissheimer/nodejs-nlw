import {
    pgSchema,
    pgTable,
    serial,
    text,
    timestamp,
} from 'drizzle-orm/pg-core'

import { tutor } from './tutor'

export const mySchema = pgSchema('my_schema')

export const userRecord = pgTable('user_record', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  tutorId: serial('tutor_id').references(() => tutor.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
