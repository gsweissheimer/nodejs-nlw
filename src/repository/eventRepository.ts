import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { event as eventSchema } from '../drizzle/schema/event'
import type { Event } from '../models'

export const createEventRepository = async (
    event: Event
): Promise<string> => {
  const insertedEvent = await db
    .insert(eventSchema)
    .values({
      name: event.name,
      type: event.type,
      entity_id: event.entityId,
      entity_type: event.entityType,
      event_date: event.eventDate,
    })
    .returning()

  return insertedEvent[0].id
}

export const deleteEventByIdRepository = async (id: string): Promise<boolean> => {
  await db.delete(eventSchema).where(eq(eventSchema.id, id))

  return true 
}