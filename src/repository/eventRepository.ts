import { and, eq, inArray, not } from "drizzle-orm";
import { db } from "../drizzle/client";
import { event as eventSchema, } from '../drizzle/schema/event'
import { familyTutor as familyTutorSchema } from '../drizzle/schema/family_tutor'
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
  entityId: string | string[]
): Promise<Event[]> => {
  const event = await db
    .select()
    .from(eventSchema)
    .where(
      and(
        Array.isArray(entityId)
          ? inArray(eventSchema.entityId, entityId)
          : eq(eventSchema.entityId, entityId),
        eq(eventSchema.entityType, 'pet')
      )
    )
    .orderBy(eventSchema.eventDate)

  return event
}

export const getEventsByTutorIdRepository = async (
  tutorId: string
): Promise<Event[]> => {
  const events = await db
    .select()
    .from(eventSchema)
    .where(
      and(
        eq(eventSchema.entityId, tutorId),
        eq(eventSchema.entityType, 'tutor')
      )
    )
    .orderBy(eventSchema.eventDate)

  return events
}

export const getFamilyEventsByFamilyIdRepository = async (
  familyId: string
): Promise<Event[]> => {

  const events = await db
    .select()
    .from(eventSchema)
    .where(
      and(
        eq(eventSchema.entityId, familyId),
        eq(eventSchema.entityType, 'family')
      )
    )
    .orderBy(eventSchema.eventDate)

  return events
}

export const getTutorFamilyEventsByFamilyIdRepository = async (
  familyId: string,
  tutorId: string
): Promise<Event[]> => {

  const events: Event[] = await db
    .select({
      id: eventSchema.id,
      name: eventSchema.name,
      value: eventSchema.value,
      type: eventSchema.type,
      entityId: eventSchema.entityId,
      entityType: eventSchema.entityType,
      eventDate: eventSchema.eventDate,
      createdAt: eventSchema.createdAt,
    })
    .from(familyTutorSchema)
    .innerJoin(
      eventSchema,
      eq(eventSchema.entityId, familyTutorSchema.tutorId)
    )
    .where(
      and(
        eq(familyTutorSchema.familyId, familyId),
        eq(eventSchema.entityType, 'tutor'),
        eq(eventSchema.entityId, familyTutorSchema.tutorId),
        not(eq(familyTutorSchema.tutorId, tutorId))
      )
    )
    .orderBy(eventSchema.eventDate)

  return events
}