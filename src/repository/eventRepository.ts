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
      value: event.value,
      type: event.type,
      entityId: event.entityId,
      entityType: event.entityType,
      eventDate: event.eventDate,
    })
    .returning()

  return insertedEvent[0].id
}

export const deleteEventByIdRepository = async (id: string): Promise<boolean> => {
  await db.delete(eventSchema).where(eq(eventSchema.id, id))

  return true 
}

export const getEventsByPetIdRepository = async (
  entityId: string
): Promise<Event[]> => {
  const event = await db
    .select()
    .from(eventSchema)
    .where(eq(eventSchema.entityId, entityId))

  return event
}