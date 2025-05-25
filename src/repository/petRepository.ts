import { and, eq } from 'drizzle-orm'
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
    .where(and(eq(petSchema.tutorId, uuid),eq(petSchema.isActive, true)))

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
      color: petSchema.color,
      breedId: petSchema.breedId,
      tutorId: petSchema.tutorId,
      birthDate: petSchema.birthDate,
      microchip: petSchema.microchip,
      isActive: petSchema.isActive,
      isVaccinated: petSchema.isVaccinated,
      isCastrated: petSchema.isCastrated,
      isFiev: petSchema.isFiev,
      isFelv: petSchema.isFelv,
      angel: petSchema.angel,
      dewormedExpirationDate: petSchema.dewormedExpirationDate,
      antiFleaExpirationDate: petSchema.antiFleaExpirationDate,
      createdAt: petSchema.createdAt,
      updatedAt: petSchema.updatedAt,
    })
    .from(familyTutorSchema)
    .innerJoin(petSchema, eq(familyTutorSchema.tutorId, petSchema.tutorId))
    .where(and(eq(familyTutorSchema.familyId, uuid), eq(petSchema.isActive, true)))

  return pets
}

export const getPetByIdRepository = async (
  uuid: string
): Promise<Pet> => {
  const pets: Pet[] = await db
    .select()
    .from(petSchema)
    .where(eq(petSchema.id, uuid))

  return pets[0]
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

export const archivePetByIdRepository = async (
  id: string
): Promise<boolean> => {
  const returnPet = await db
    .update(petSchema)
    .set({ isActive: false })
    .where(eq(petSchema.id, id))
    .returning()

  return returnPet.length > 0
}

export const updatePetByIdRepository = async (pet: Pet): Promise<Pet> => {
  if (!pet.id) {
    throw new Error('Pet ID is required for update')
  }
  const returnedPet = await db
    .update(petSchema)
    .set({
      name: pet.name,
      type: pet.type,
      breedId: pet.breedId,
      tutorId: pet.tutorId,
      birthDate: pet.birthDate,
      microchip: pet.microchip,
      isActive: pet.isActive,
    })
    .where(eq(petSchema.id, pet.id))
    .returning()

  return returnedPet[0]
}