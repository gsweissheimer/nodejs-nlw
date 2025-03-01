import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { tutor } from "../drizzle/schema/tutor";
import type { Tutor } from '../models/tutor'

export const createTutorRepository = async (
  name: string,
  cpf: string,
  email: string
): Promise<Tutor> => {
  const newTutor = await db.insert(tutor).values({ name, cpf, email, isActive: true }).returning();
  return newTutor[0]
}

export const GetTutorByIdRepository = async (
  id: string
): Promise<Tutor> => {
  const tutorData = await db.select().from(tutor).where(eq(tutor.id, id))

  return tutorData[0]
}