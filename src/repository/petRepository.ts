import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { familyTutor as familyTutorSchema } from '../drizzle/schema/family_tutor'
import { pet as petSchema } from "../drizzle/schema/pet";
import type { Pet } from '../models/'

export const getPetsByTutorIdRepository = async (
  uuid: string
): Promise<Pet[]> => {
  const pets: Pet[] = await db
    .select()
    .from(petSchema)
    .where(eq(petSchema.tutorId, uuid))

  return pets
}

export const getPetsByFamilyIdRepository = async (
  uuid: string
): Promise<Pet[]> => {
  const pets: Pet[] = await db
    .select({
      id: petSchema.id,
      name: petSchema.name,
      type: petSchema.type,
      breedId: petSchema.breedId,
      tutorId: petSchema.tutorId,
      birthDate: petSchema.birthDate,
      microchip: petSchema.microchip,
      isActive: petSchema.isActive,
      angel: petSchema.angel,
      createdAt: petSchema.createdAt,
      updatedAt: petSchema.updatedAt,
    })
    .from(familyTutorSchema)
    .innerJoin(petSchema, eq(familyTutorSchema.tutorId, petSchema.tutorId))
    .where(eq(familyTutorSchema.familyId, uuid))

  return pets
}

export const getPetByIdRepository = async (
  uuid: string
): Promise<Pet[]> => {
  const pets: Pet[] = await db
    .select()
    .from(petSchema)
    .where(eq(petSchema.id, uuid))

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
        createdAt: newPet.createdAt})
    .returning()
    
  return returnPet[0]
}