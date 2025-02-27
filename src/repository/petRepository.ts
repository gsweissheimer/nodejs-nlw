import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { pet as petSchema } from "../drizzle/schema/pet";
import type { Pet } from '../models/'

export const getPetsByTutorIdRepository = async (uuid: string): Promise<Pet[]> => {
    const pets: Pet[] = await db
      .select()
      .from(petSchema)
      .where(eq(petSchema.tutorId, uuid))
      
    return pets
}

export const createPetRepository = async (
  newPet: Pet
): Promise<Pet> => {
  const returnPet = await db
    .insert(petSchema)
    .values({
        name: newPet.name,
        type: newPet.type,
        breedId: newPet.breedId,
        tutorId: newPet.tutorId,
        birthDate: newPet.birthDate,
        microchip: newPet.microchip,
        isActive: newPet.isActive,
        angel: newPet.angel,
        createdAt: newPet.createdAt,
        updatedAt: newPet.updatedAt})
    .returning()
  return returnPet[0]
}