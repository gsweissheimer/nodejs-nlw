import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { userRecord } from "../drizzle/schema/user_record";
import type { User } from '../models/user'

export const getUserByUsernameRepository = async (username: string): Promise<User> => {

    const user = await db
        .select()
        .from(userRecord)
        .where(eq(userRecord.username, username));
        
    return user[0];
}

export const createUserRepository = async (
  username: string,
  password: string,
): Promise<User> => {
  const newTutor = await db
    .insert(userRecord)
    .values({ username, password })
    .returning()
  return newTutor[0]
}