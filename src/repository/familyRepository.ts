import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { family as familySchema } from "../drizzle/schema/family";
import { familyTutor as familyTutorSchema } from '../drizzle/schema/family_tutor'
import type { Family } from '../models'

export const getFamilyByTutorIdRepository = async (uuid: string): Promise<Family> => {
    let family = await db
      .select()
      .from(familySchema)
      .where(eq(familySchema.tutorId, uuid))

    if (family.length === 0) {
      family = await db
        .select({
          id: familySchema.id,
          name: familySchema.name,
          tutorId: familySchema.tutorId,
          createdAt: familySchema.createdAt,
          updatedAt: familySchema.updatedAt,
        })
        .from(familyTutorSchema)
        .innerJoin(
          familySchema,
          eq(familyTutorSchema.familyId, familySchema.id)
        )
        .where(eq(familyTutorSchema.tutorId, uuid))
      
    }
      
    return family[0]
}