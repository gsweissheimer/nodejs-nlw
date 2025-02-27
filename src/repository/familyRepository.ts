import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { family as familySchema } from "../drizzle/schema/family";
import type { Family } from '../models'

export const getFamilyByTutorIdRepository = async (uuid: string): Promise<Family> => {
    const family = await db
      .select()
      .from(familySchema)
      .where(eq(familySchema.tutorId, uuid))
      
    return family[0]
}