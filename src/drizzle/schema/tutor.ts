import {
  boolean,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const mySchema = pgSchema('my_schema')

export const tutor = pgTable('tutor', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  cpf: text('cpf').notNull(),
  email: text('email').notNull().unique(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})
