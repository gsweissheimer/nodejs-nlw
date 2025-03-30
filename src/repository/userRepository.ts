import { and, eq, not } from 'drizzle-orm'
import { db } from "../drizzle/client";
import { family } from '../drizzle/schema/family'
import { familyTutor } from "../drizzle/schema/family_tutor"
import { tutor } from '../drizzle/schema/tutor'
import { userRecord } from "../drizzle/schema/user_record";
import type { User, UserMin } from '../models/user'

export const getUserByUsernameRepository = async (
  username: string
): Promise<User> => {
  const user = await db
    .select()
    .from(userRecord)
    .where(eq(userRecord.username, username))

  return user[0]
}
export const getUserByIdRepository = async (
  id: string
): Promise<User> => {
  const user = await db
    .select()
    .from(userRecord)
    .where(eq(userRecord.id, id))

  return user[0]
}
export const createUserRepository = async (
  username: string,
  password: string,
  tutorId: string
): Promise<User> => {
  const newTutor = await db
    .insert(userRecord)
    .values({ username, password, tutorId })
    .returning()
  return newTutor[0]
}
export const GetFamilyUsersByFamilyIdRepository = async (
  familyId: string,
  tutorId: string
): Promise<UserMin[]> => {
  
  const users = await db
    .select({
      id: userRecord.id,
      username: userRecord.username,
      tutorId: userRecord.tutorId,
    })
    .from(familyTutor)
    .innerJoin(family, eq(family.id, familyTutor.familyId))
    .innerJoin(tutor, eq(tutor.id, familyTutor.tutorId))
    .innerJoin(userRecord, eq(userRecord.tutorId, familyTutor.tutorId))
    .where(
      and(
        eq(familyTutor.familyId, familyId),
        not(eq(familyTutor.tutorId, tutorId))
      )
    )

  if (users.length === 0) {
      const ownerUsers = await db
        .select({
          id: userRecord.id,
          username: userRecord.username,
          tutorId: userRecord.tutorId,
        })
        .from(family)
        .innerJoin(userRecord, eq(userRecord.tutorId, family.tutorId))
        .where(eq(family.id, familyId))

        users.push(...ownerUsers)
  }

  return users
}
