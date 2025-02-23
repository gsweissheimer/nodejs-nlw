import { pgSchema, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const mySchema = pgSchema('my_schema')

export const pet_types = mySchema.enum('pet_types', ['dog', 'cat'])

export const breed = pgTable('breed', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: pet_types('type').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
})